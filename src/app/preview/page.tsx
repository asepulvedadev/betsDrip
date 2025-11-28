import Preview3D from "@/components/Preview3D";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Diseña tu Drip
      </h1>
      <Preview3D />
    </div>
  );
}