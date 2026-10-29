import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f4ef] px-6 text-center text-[#1c1a17]">
      <p className="font-serif text-2xl">MADE SAiNT</p>
      <h1 className="mt-8 font-serif text-5xl">This page is not in the house.</h1>
      <p className="mt-4 max-w-md text-sm text-[#1c1a17]/70">The Founding Edition is still here.</p>
      <Link href="/shop" className="mt-10 border-b border-[#1c1a17] pb-1 text-[11px] tracking-[0.18em] uppercase">
        Return to the shop
      </Link>
    </div>
  );
}
