import { Toaster } from "sonner";
import Header from "./components/Header";
import ProfileSidebar from "./components/ProfileSidebar";
import Wall from "./components/Wall";

export default function Home() {
  return <main className="bg-zinc-900 text-white">
      <Header />

      <section className="grid grid-cols-1 lg:grid-cols-3 container mx-auto gap-4 p-4 min-h-screen">
        <ProfileSidebar />
        <Wall />
      </section>

      <Toaster />
  </main>
}