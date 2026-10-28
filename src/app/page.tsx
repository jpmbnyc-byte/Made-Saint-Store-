import Image from "next/image";

const sheets = [
  ["01", "Orthographic set", "sheet-01-orthographic.svg"],
  ["02", "Upper construction", "sheet-02-upper.svg"],
  ["03", "Outsole construction", "sheet-03-outsole.svg"],
  ["04", "Footbed", "sheet-04-footbed.svg"],
  ["05", "Exploded assembly", "sheet-05-exploded.svg"],
  ["06", "Provisional patterns", "sheet-06-patterns.svg"],
  ["07", "Bill of materials", "sheet-07-bom.svg"],
  ["08", "Prototype sequence", "sheet-08-sequence.svg"],
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1c1b19] text-[#f4f0e6]">
      <header className="sticky top-0 z-10 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 bg-[#1c1b19]/95 px-4 py-3">
        <div>
          <p className="font-serif text-2xl leading-none">MADE SAiNT</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            MS-TM01 Trail Mule · Prototype 001 · Rev B
          </p>
        </div>
        <nav className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
          <a className="border border-[#c46a62] bg-[#c46a62] px-2 py-1 text-[#1c1b19] hover:bg-transparent hover:text-[#f4f0e6]" href="/studio">
            Collection Studio
          </a>
          <a className="border border-white/30 px-2 py-1 hover:bg-[#f4f0e6] hover:text-[#1c1b19]" href="/ms-tm01/pdf/MS-TM01-P001-technical-package.pdf">
            PDF
          </a>
          <a className="border border-white/30 px-2 py-1 hover:bg-[#f4f0e6] hover:text-[#1c1b19]" href="/ms-tm01/bom/MS-TM01-bom.csv">
            BOM
          </a>
          <a className="border border-white/30 px-2 py-1 hover:bg-[#f4f0e6] hover:text-[#1c1b19]" href="/ms-tm01/manual/MS-TM01-prototype-construction.md">
            Manual
          </a>
        </nav>
      </header>
      <div className="grid lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 lg:block lg:border-b-0 lg:border-r">
          {sheets.map(([num, title]) => (
            <a key={num} href={`#sheet-${num}`} className="block whitespace-nowrap px-2 py-1 font-mono text-xs hover:bg-white/10">
              <span className="text-[#c46a62]">{num}</span> {title}
            </a>
          ))}
        </nav>
        <main className="space-y-8 px-3 py-4">
          <p className="max-w-3xl text-sm leading-relaxed text-white/80">
            Proportion study of the powder-blue trail mule for one handmade pair, US men’s 12 wide.
            The reference card is the design authority. These sheets are not measured patterns.
            Every unverified figure is provisional and needs a physical last and the sourced outsole.
          </p>
          {sheets.map(([num, title, file]) => (
            <figure key={num} id={`sheet-${num}`} className="scroll-mt-20">
              <figcaption className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                Sheet {num} · {title}
              </figcaption>
              <Image
                src={`/ms-tm01/drawings/${file}`}
                alt={`Sheet ${num}, ${title}`}
                width={1600}
                height={1131}
                unoptimized
                className="h-auto w-full border border-black/40 bg-[#f6f5f2]"
              />
            </figure>
          ))}
        </main>
      </div>
    </div>
  );
}
