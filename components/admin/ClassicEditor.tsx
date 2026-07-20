"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function ClassicEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  function emit() {
    if (ref.current) onChange(ref.current.innerHTML);
  }

  function exec(command: string, arg?: string) {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    emit();
  }

  function insertLink() {
    const url = window.prompt("Enter URL:");
    if (url) exec("createLink", url);
  }

  const btn =
    "grid h-9 w-9 place-items-center rounded-lg text-ink/70 hover:bg-ink/5 hover:text-darkgreen";

  return (
    <div className="rounded-2xl border border-ink/15 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-ink/10 p-2">
        <button type="button" className={btn} title="Bold" onClick={() => exec("bold")}>
          <span className="font-bold">B</span>
        </button>
        <button type="button" className={btn} title="Italic" onClick={() => exec("italic")}>
          <span className="italic">I</span>
        </button>
        <button type="button" className={btn} title="Underline" onClick={() => exec("underline")}>
          <span className="underline">U</span>
        </button>
        <span className="mx-1 h-6 w-px bg-ink/10" />
        <button type="button" className={btn} title="Insert link" onClick={insertLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <button type="button" className={btn} title="Unordered list" onClick={() => exec("insertUnorderedList")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button type="button" className={btn} title="Ordered list" onClick={() => exec("insertOrderedList")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 6h14M7 12h14M7 18h14M2 6h1v1H2V6zm0 6h1v1H2v-1zm0 6h1v1H2v-1z" />
          </svg>
        </button>
        <button type="button" className={btn} title="Quote" onClick={() => exec("formatBlock", "blockquote")}>
          <span className="font-serif text-sm">&#8220;</span>
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        className="prose max-w-none min-h-[220px] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-master/20"
        style={{ wordBreak: "break-word" }}
      />
    </div>
  );
}
