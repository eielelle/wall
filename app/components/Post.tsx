import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Post = {
    message: "";
    img_url: "";
    id: number;
    created_at: string;
}

export default function Post({ post }: { post: Post }) {
    return <Card key={post.id} className="bg-zinc-900 text-white">
                <CardHeader>
                    <CardTitle>Eleazar Romero</CardTitle>
                    <CardDescription>
                        Meycauayan, Bulacan, Philippines
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p>{post.message}</p>

                    <br />
                    
                    { (post.img_url != "") && <div className="relative aspect-video w-full h-auto">
                        <Image src={post.img_url} layout="fill" objectFit="cover/contain" alt="picture" />
                    </div>}

                    
                </CardContent>
            </Card>
}