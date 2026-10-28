"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, SendHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HELP, SUGGESTIONS, interpret, type ChatAction, type ChatContext } from "@/lib/chat";
import { cn } from "@/lib/utils";

type Msg = { role: "you" | "studio"; text: string };
const STORE = "ms-studio-chat-v1";

export function ProductionChat({ ctx, onActions }: { ctx: ChatContext; onActions: (a: ChatAction[]) => void }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "studio", text: HELP }]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) ?? "null") as Msg[] | null;
      if (saved?.length) setMsgs(saved);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify(msgs.slice(-60)));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const reply = interpret(q, ctx);
    setMsgs((m) => [...m, { role: "you", text: q }, { role: "studio", text: reply.text }]);
    setDraft("");
    if (reply.actions.length) onActions(reply.actions);
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#22201d] px-4 py-3 text-[13px] text-[#f7f3ea] shadow-lg hover:bg-[#22201d]/90 print:hidden"
        aria-expanded={open}
        aria-controls="production-chat"
      >
        {open ? <X className="size-4" /> : <MessageSquare className="size-4" />}
        {open ? "Close" : "Production chat"}
      </button>

      <aside
        id="production-chat"
        aria-label="Production chat"
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 flex h-[78vh] flex-col border-t border-[#22201d]/15 bg-[#fbf8f2] shadow-2xl transition-transform duration-200 sm:inset-x-auto sm:right-4 sm:bottom-20 sm:h-[640px] sm:max-h-[calc(100vh-7rem)] sm:w-[400px] sm:rounded-xl sm:border print:hidden",
          open ? "translate-y-0" : "pointer-events-none translate-y-[110%]",
        )}
      >
        <header className="flex items-center justify-between border-b border-[#22201d]/10 px-4 py-3">
          <div>
            <p className="font-serif text-xl leading-none">Production chat</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#22201d]/50">Runs the studio · no data leaves the browser</p>
          </div>
          <button onClick={() => setMsgs([{ role: "studio", text: HELP }])} className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#22201d]/50 hover:text-[#22201d]">
            Clear
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "you" ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-[88%] whitespace-pre-wrap rounded-lg px-3 py-2 text-[13px] leading-snug",
                  m.role === "you" ? "bg-[#22201d] text-[#f7f3ea]" : "border border-[#22201d]/10 bg-white/80",
                )}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} className="shrink-0 rounded-full border border-[#22201d]/15 bg-white/70 px-2.5 py-1 text-[11px] hover:bg-[#22201d] hover:text-[#f7f3ea]">
              {s}
            </button>
          ))}
        </div>

        <form
          className="flex items-end gap-2 border-t border-[#22201d]/10 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <textarea
            ref={inputRef}
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(draft);
              }
            }}
            placeholder="“Look 2 runner tonal” or “cost look 1”"
            className="min-h-10 flex-1 resize-none rounded-md border border-[#22201d]/15 bg-white px-2.5 py-2 text-[13px] outline-none focus:border-[#22201d]/50"
            aria-label="Message"
          />
          <Button type="submit" size="icon" className="size-10 bg-[#22201d] text-[#f7f3ea] hover:bg-[#22201d]/85" aria-label="Send">
            <SendHorizontal />
          </Button>
        </form>
      </aside>
    </>
  );
}
