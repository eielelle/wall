'use client'

import supabase from "@/lib/supabase";
import InputPost from "./InputPost";
import { useEffect, useReducer, useState } from "react";
import Post from "./Post";
import { Skeleton } from "@/components/ui/skeleton";

type Post = {
    message: "";
    img_url: "";
    id: number;
    created_at: string;
}

// State Type
interface State {
  posts: Post[]
}

// Action Types
type Action =
    | { type: 'SYNC'; payload: Post }
    | { type: 'SET'; payload: Post[] };


// Reducer function with correct typing
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SYNC':
      const newPosts = [action.payload, ...state.posts];

      // Keep only the top 50 posts, sorted by created_at (newest to oldest)
      return {
        posts: newPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 50),
      };
    case 'SET':
        return {
            posts: action.payload
        }
    default:
      return state;
  }
}

export default function Wall() {
    const [state, dispatch] = useReducer(reducer, { posts: [] })
    const [loading, setLoading] = useState(false);

    async function loadInitialData() {
        const {data, error} = await supabase.from("posts").select("*").order("created_at", {ascending: false}).limit(50)

        if (!error) {
            dispatch({type: "SET", payload: data})
        }
    }

    useEffect(() => {
        setLoading(true);

        // initial data
        loadInitialData()

        const channel = supabase
        .channel('public:posts')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
            // console.log('Change received!', payload)
            dispatch({type: "SYNC", payload: payload.new as Post})
        })
        .subscribe()

        setLoading(false)

        return () => {
            channel.unsubscribe()
        }
    }, [])


    return <div className="col-span-2 space-y-4">
        <InputPost />

        { loading && <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>}

        {state.posts.map((post: Post) => (
            <Post key={post.id} post={post} />
        ))}
    </div>
}