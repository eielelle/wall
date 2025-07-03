'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

export default function InputPost() {
    const [post, setPost] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false);
    const [totalLength, setTotalLength] = useState(300);

    function clearPost() {
        setPost("");
        setFile(null);
        setTotalLength(300);
    }

    async function upload(file: File) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `uploads/${fileName}`

        const { data, error } = await supabase.storage
            .from('posts-bucket') // replace with your bucket
            .upload(filePath, file)

        if (error) throw error
        return data
    }

    function insertPost() {
        if (post.length <= 0 && !file) {
            return
        }
        setLoading(true)
        const promise = new Promise(async (resolve, reject) => {
            try {
                let publicUrl = ""

                if (file) {
                    const data = await upload(file)
                    const storagePath = data.path
                    publicUrl = supabase.storage.from('posts-bucket').getPublicUrl(storagePath).data.publicUrl
                }

                const { data } = await supabase.from('posts').insert({img_url: publicUrl, message: post})
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })

        toast.promise(promise, {
            loading: 'Loading...',
            success: () => {
                clearPost()
                return "Post has been shared";
            },
            error: 'Something went wrong',
        });

        setLoading(false)
    }

    function inputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPost(e.target.value)
        setTotalLength(300 - e.target.value.length)
    }


    return <div className={`space-y-4 ${loading && 'pointer-events-none'}`}>
        <header>
            <h1 className="text-xl font-semibold">My Timeline</h1>
            <p className="text-gray-500">Say hi!</p>
        </header>

        <div>
            <Textarea disabled={loading} className="h-[100px]" value={post} placeholder="What's up" onChange={inputChange} />
            <p className="text-sm text-gray-500 mt-2">{totalLength} characters left</p>
        </div>
        <ImageUpload parentFile={file} submitFile={setFile}/>

        <Button disabled={post.length <= 0 && !file} className="ml-auto block bg-white text-black hover:bg-gray-800 hover:text-white" type="submit" onClick={insertPost}>🙌 Share to wall</Button>

    </div>
}