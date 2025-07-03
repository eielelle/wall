import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSidebar() {
    return <aside className="col-span-1">
        <div>
            <Avatar className="xl:w-[400px] xl:h-[400px] md:w-[200px] md:h-[200px] mx-auto aspect-square">
                <AvatarImage 
                    src="https://github.com/shadcn.png" 
                    className="object-cover" 
                    alt="User Avatar"
                />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Eleazar Romero</h1>
                <p>Exploring the cosmos...</p>
            </div>
        </div>

        <div className="mt-4">
            <h2 className="text-xl font-semibold">Information</h2>
            <span className="w-full block bg-gray-400 h-0.5"></span>

            <div className="mt-4">
                <h3 className="font-semibold text-lg">Networks</h3>
                <p>College Alumni</p>
                <br />
                <h3 className="ont-semibold text-lg">Current City</h3>
                <p>Meycauayan, Bulacan, Philippines</p>
            </div>
        </div>
    </aside>
}