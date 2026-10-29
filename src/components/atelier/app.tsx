"use client";

import { useEffect, useMemo, useState } from "react";

type ViewId = "hero" | "three-quarter" | "reverse" | "detail" | "study";

type Line = { productId: string; colorwayId: string; modelId: string; views: ViewId[] };

type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  material: string;
  materialStatus: string;
  priceStatus: string;
  retailUsd: number | null;
  colorways: { id: string; name: string; status: string }[];
  blockers: string[];
  references: { id: string; src: string }[];
};

type Job = {
  id: string;
  productId: string;
  sku: string;
  colorwayId: string;
  view: string;
  modelId: string;
  status: string;
  conceptual: boolean;
  actualCostUsd: number | null;
  error: string | null;
  output: { qa: string[] } | null;
  prompt: string;
};

type Payload = {
  catalog: Product[];
  models: { id: string; name: string; heightCategory: string; referenceAssetIds: string[] }[];
  campaigns: { id: string; title: string; modelId: string; pieces: string }[];
  slots: { id: string; place: string; label: string }[];
  limits: string[];
  model: string;
  configured: boolean;
  testPlan: { items: { conceptual: boolean; modelId: string }[]; estimate: { imageCount: number; usd: null; reason: string }; rejected: string[] };
  summary: { jobs: number; queued: number; review: number; failed: number; approved: number; published: number; actualCostUsd: number };
  jobs: Job[];
  batches: { id: string; status: string; ceilingUsd: number | null; jobIds: string[] }[];
  published: { productId: string; view: string; src: string }[];
  error?: string;
};

const ALL: ViewId[] = ["hero", "three-quarter", "reverse", "detail", "study"];

export function AtelierApp() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [plan, setPlan] = useState<Payload["testPlan"] | null>(null);
  const [confirm, setConfirm] = useState("");
  const [ceiling, setCeiling] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(nextToken = token) {
    const response = await fetch(`/api/admin/atelier?token=${encodeURIComponent(nextToken)}`);
    const body = (await response.json()) as Payload;
    if (!response.ok) {
      setError(body.error ?? "The atelier refused the request.");
      return;
    }
    setError("");
    setData(body);
    setPlan(body.testPlan);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("ms-admin-token") ?? "";
    setToken(saved);
    void load(saved);
    // The first load uses the stored token only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function post(action: string, extra: Record<string, unknown> = {}) {
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/atelier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, token, ...extra }),
    });
    const body = await response.json();
    setBusy(false);
    if (!response.ok) {
      setError(body.error ?? "Request failed.");
      return body;
    }
    if (action === "plan") setPlan(body);
    await load();
    return body;
  }

  const catalog = data?.catalog ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data?.jobs ?? []).filter((job) => !q || `${job.sku} ${job.colorwayId} ${job.view} ${job.modelId} ${job.status}`.toLowerCase().includes(q));
  }, [data, query]);

  function addLine(productId: string) {
    const product = catalog.find((item) => item.id === productId);
    if (!product) return;
    const modelId = product.category === "footwear" ? "mod-none" : product.id === "p01" ? "mod-tall-01" : "mod-editorial-01";
    setLines((current) => [...current, { productId, colorwayId: product.colorways[0]?.id ?? "", modelId, views: [...ALL] }]);
  }

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#1c1a17]">
      <header className="border-b border-[#1c1a17]/10 px-5 py-6 md:px-10">
        <p className="text-[11px] tracking-[0.22em] text-[#1c1a17]/55 uppercase">Internal</p>
        <h1 className="mt-2 font-serif text-5xl">Visual Atelier</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1c1a17]/70">
          Image production for MADE SAiNT. Generated frames stay in review until a person approves them. Prices stay in the catalog, not in the picture.
        </p>
      </header>

      <main className="mx-auto grid max-w-[1200px] gap-10 px-5 py-10 md:px-10">
        <section className="flex flex-wrap items-end gap-3">
          <label className="text-[11px] tracking-[0.14em] uppercase">
            Admin token
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="mt-1 block h-11 w-64 border border-[#1c1a17]/20 bg-white px-3 text-sm normal-case tracking-normal"
            />
          </label>
          <button
            type="button"
            className="h-11 bg-[#1c1a17] px-4 text-[11px] tracking-[0.16em] text-[#f6f4ef] uppercase"
            onClick={() => {
              sessionStorage.setItem("ms-admin-token", token);
              void load();
            }}
          >
            Open
          </button>
          {error && <p className="text-sm text-[#8a2e24]">{error}</p>}
        </section>

        {data && (
          <>
            <section className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ["Products", String(data.catalog.length)],
                ["In review", String(data.summary.review)],
                ["Queued", String(data.summary.queued)],
                ["Failed", String(data.summary.failed)],
                ["Approved", String(data.summary.approved)],
                ["Recorded cost", data.summary.actualCostUsd ? `$${data.summary.actualCostUsd}` : "None yet"],
              ].map(([label, value]) => (
                <article key={label} className="border border-[#1c1a17]/12 p-4">
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#1c1a17]/50">{label}</p>
                  <p className="mt-2 font-serif text-3xl">{value}</p>
                </article>
              ))}
            </section>

            <section className="border border-[#1c1a17]/12 p-5">
              <p className="text-[11px] tracking-[0.16em] uppercase">Provider</p>
              <p className="mt-2 font-serif text-3xl">{data.model}</p>
              <p className="mt-2 text-sm">{data.configured ? "Key is set on the server." : "OPENAI_API_KEY is not set. Planning works. Generation does not, and no placeholder image is created."}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#1c1a17]/70">
                {data.limits.map((limit) => (
                  <li key={limit}>{limit}</li>
                ))}
              </ul>
            </section>

            <section>
              <p className="text-[11px] tracking-[0.16em] uppercase">First production test</p>
              <h2 className="mt-2 font-serif text-4xl">Three products. Fifteen frames.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1c1a17]/70">
                Espresso suede runner, product only. Arrival jacket on the tall athletic house model. Camel suit on the standard editorial model. Jacket and suit specifications are directional, so those frames would stay conceptual even after generation.
              </p>
              <p className="mt-3 text-sm">{data.testPlan.estimate.reason}</p>
              <p className="mt-2 text-sm">Count: {data.testPlan.estimate.imageCount}. Dollar estimate: unavailable.</p>
              <button type="button" className="mt-4 border border-[#1c1a17] px-4 py-3 text-[11px] tracking-[0.16em] uppercase" onClick={() => setLines(data.testPlan ? testLines(data) : [])}>
                Load the fifteen-frame plan
              </button>
            </section>

            <section className="border border-[#1c1a17]/12 p-5">
              <h2 className="font-serif text-3xl">Batch builder</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <select id="add-product" className="h-11 border border-[#1c1a17]/20 bg-white px-2 text-sm" defaultValue="">
                  <option value="" disabled>
                    Add a product
                  </option>
                  {catalog.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.sku} · {product.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="h-11 border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase"
                  onClick={() => {
                    const select = document.getElementById("add-product") as HTMLSelectElement | null;
                    if (select?.value) addLine(select.value);
                  }}
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 divide-y divide-[#1c1a17]/10">
                {lines.map((line, index) => {
                  const product = catalog.find((item) => item.id === line.productId);
                  return (
                    <li key={`${line.productId}-${index}`} className="grid gap-3 py-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
                      <div>
                        <p className="font-serif text-2xl">{product?.name}</p>
                        <p className="text-[12px] text-[#1c1a17]/55">{product?.material} · {product?.materialStatus} · {product?.priceStatus === "approved" && product.retailUsd != null ? `$${product.retailUsd}` : "Price pending"}</p>
                      </div>
                      <select
                        value={line.colorwayId}
                        onChange={(event) => setLines(lines.map((item, i) => (i === index ? { ...item, colorwayId: event.target.value } : item)))}
                        className="h-11 border border-[#1c1a17]/20 bg-white px-2 text-sm"
                      >
                        {product?.colorways.map((color) => (
                          <option key={color.id} value={color.id}>
                            {color.name} · {color.status}
                          </option>
                        ))}
                      </select>
                      <select
                        value={line.modelId}
                        onChange={(event) => setLines(lines.map((item, i) => (i === index ? { ...item, modelId: event.target.value } : item)))}
                        className="h-11 border border-[#1c1a17]/20 bg-white px-2 text-sm"
                      >
                        {data.models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="text-[11px] tracking-[0.14em] uppercase" onClick={() => setLines(lines.filter((_, i) => i !== index))}>
                        Remove
                      </button>
                      <div className="flex flex-wrap gap-2 md:col-span-4">
                        {ALL.map((view) => {
                          const on = line.views.includes(view);
                          return (
                            <button
                              key={view}
                              type="button"
                              aria-pressed={on}
                              className={`border px-2 py-1 text-[11px] tracking-[0.12em] uppercase ${on ? "border-[#1c1a17] bg-[#1c1a17] text-[#f6f4ef]" : "border-[#1c1a17]/25 text-[#1c1a17]/55"}`}
                              onClick={() =>
                                setLines(
                                  lines.map((item, i) =>
                                    i === index
                                      ? { ...item, views: on ? item.views.filter((value) => value !== view) : [...item.views, view] }
                                      : item,
                                  ),
                                )
                              }
                            >
                              {view}
                            </button>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <button type="button" disabled={busy || lines.length === 0} className="h-11 border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase disabled:opacity-40" onClick={() => void post("plan", { lines })}>
                  Estimate
                </button>
                <label className="text-[11px] tracking-[0.14em] uppercase">
                  Spend ceiling, USD
                  <input value={ceiling} onChange={(event) => setCeiling(event.target.value)} inputMode="decimal" className="mt-1 block h-11 w-32 border border-[#1c1a17]/20 bg-white px-3 text-sm normal-case" />
                </label>
                <label className="text-[11px] tracking-[0.14em] uppercase">
                  Confirmation
                  <input value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder="APPROVE BATCH" className="mt-1 block h-11 w-48 border border-[#1c1a17]/20 bg-white px-3 text-sm normal-case" />
                </label>
                <button
                  type="button"
                  disabled={busy || !data.configured || confirm !== "APPROVE BATCH"}
                  className="h-11 bg-[#1c1a17] px-4 text-[11px] tracking-[0.14em] text-[#f6f4ef] uppercase disabled:opacity-40"
                  onClick={() => void post("create", { lines, confirm, ceilingUsd: ceiling ? Number(ceiling) : null })}
                >
                  Queue the batch
                </button>
              </div>
              {plan && <p className="mt-4 text-sm">{plan.estimate.imageCount} images. {plan.estimate.reason}</p>}
            </section>

            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-serif text-3xl">Queue</h2>
                <button type="button" disabled={busy || !data.configured} className="h-11 border border-[#1c1a17] px-4 text-[11px] tracking-[0.14em] uppercase disabled:opacity-40" onClick={() => void post("work")}>
                  Run one job
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {data.batches.map((batch) => (
                  <li key={batch.id} className="flex flex-wrap items-center justify-between gap-3 border border-[#1c1a17]/12 p-4 text-sm">
                    <span>{batch.status} · {batch.jobIds.length} jobs {batch.ceilingUsd != null ? `· ceiling $${batch.ceilingUsd}` : ""}</span>
                    <span className="flex gap-3">
                      <button type="button" onClick={() => void post("pause", { batchId: batch.id })}>Pause</button>
                      <button type="button" onClick={() => void post("resume", { batchId: batch.id })}>Resume</button>
                      <button type="button" onClick={() => void post("cancel", { batchId: batch.id })}>Cancel</button>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-serif text-3xl">Review and library</h2>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="SKU, colorway, view, model" className="h-11 w-64 border border-[#1c1a17]/20 bg-white px-3 text-sm" />
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {filtered.map((job) => (
                  <article key={job.id} className="border border-[#1c1a17]/12 p-4">
                    <p className="text-[11px] tracking-[0.14em] uppercase">{job.status}{job.conceptual ? " · conceptual" : ""}</p>
                    <h3 className="mt-1 font-serif text-2xl">{job.sku} · {job.colorwayId}</h3>
                    <p className="text-sm text-[#1c1a17]/65">{job.view} · {job.modelId} {job.actualCostUsd != null ? `· $${job.actualCostUsd}` : ""}</p>
                    {job.output && (
                      // The master is a private file. The token stays in the query because an image request cannot set a header.
                      <img alt="" src={`/api/admin/atelier/file?job=${job.id}&token=${encodeURIComponent(token)}`} className="mt-3 w-full bg-[#f1eee8]" />
                    )}
                    {job.error && <p className="mt-2 text-sm text-[#8a2e24]">{job.error}</p>}
                    {job.output && <ul className="mt-2 list-disc pl-5 text-[13px] text-[#1c1a17]/70">{job.output.qa.map((flag) => <li key={flag}>{flag}</li>)}</ul>}
                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] tracking-[0.14em] uppercase">
                      <button type="button" onClick={() => void post("review", { jobId: job.id, decision: "approved" })}>Approve</button>
                      <button type="button" onClick={() => void post("review", { jobId: job.id, decision: "rejected" })}>Reject</button>
                      <button type="button" onClick={() => void post("requeue", { jobId: job.id })}>Regenerate</button>
                      <button type="button" onClick={() => void post("publish", { jobId: job.id })}>Publish</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl">Campaigns</h2>
                <ul className="mt-3 space-y-3 text-sm">
                  {data.campaigns.map((campaign) => (
                    <li key={campaign.id}>
                      <span className="font-serif text-xl">{campaign.title}</span>
                      <span className="mt-1 block text-[#1c1a17]/65">{campaign.pieces}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-3xl">Storefront slots</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {data.slots.map((slot) => {
                    const filled = data.published.find((item) => item.view === slot.id);
                    return (
                      <li key={slot.id} className="flex justify-between gap-3 border-b border-[#1c1a17]/10 py-2">
                        <span>{slot.place} · {slot.label}</span>
                        <span className="text-[#1c1a17]/50">{filled ? "Published" : "Empty"}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function testLines(data: Payload): Line[] {
  const want = ["ms-runner-espresso", "p01", "s01"];
  return want.flatMap((id) => {
    const product = data.catalog.find((item) => item.id === id);
    if (!product) return [];
    const modelId = id === "ms-runner-espresso" ? "mod-none" : id === "p01" ? "mod-tall-01" : "mod-editorial-01";
    const colorwayId = id === "p01" ? "mineral-blue" : id === "s01" ? "camel" : product.colorways[0].id;
    return [{ productId: id, colorwayId, modelId, views: [...ALL] }];
  });
}
