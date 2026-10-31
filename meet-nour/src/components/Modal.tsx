"use client";
import { useEffect, type ReactNode } from "react";

type ModalProps = { title: string; onClose: () => void; children: ReactNode };

export default function Modal({ title, onClose, children }: ModalProps) {
  // close with the Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    // clicking the dark background closes the modal
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // clicks inside should not close it
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="px-2 text-muted cursor-pointer hover:text-red-400"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
