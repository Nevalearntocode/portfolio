import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-6 text-white">
      <p className="text-xs tracking-widest text-white/40 uppercase">404</p>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-sm text-white/50">This page doesn&apos;t exist or was moved.</p>
      <Link href="/" className="mt-2 text-sm text-[#a3b899] hover:underline">
        ← Back to portfolio
      </Link>
    </div>
  );
}
