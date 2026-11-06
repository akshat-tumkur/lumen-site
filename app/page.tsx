import CameraScroll from "@/components/CameraScroll";
import LumenExperience from "@/components/LumenExperience";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <CameraScroll />
      <LumenExperience />
    </main>
  );
}
