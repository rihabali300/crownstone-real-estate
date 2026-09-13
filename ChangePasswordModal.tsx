import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const fieldLabel = "mb-[7px] block text-[9px] uppercase tracking-[0.17em] text-[#999286]";
const fieldInput =
  "w-full border border-[#35342e] bg-[#0b0b0a] p-3 text-[15px] text-[#f4f1e8] outline-none transition-colors duration-200 focus:border-[#d9aa3d]";
const btn =
  "inline-flex min-h-[42px] items-center justify-center gap-2 border border-[#a77c21] bg-transparent px-4 text-[10px] uppercase tracking-[0.13em] text-[#d9aa3d] transition-colors duration-200";
const btnPrimary = "border-[#d9aa3d] bg-[#d9aa3d] text-[#111]";

export function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setMessage({ text: "New password must be at least 8 characters.", error: true });
      return;
    }
    if (password !== confirm) {
      setMessage({ text: "New passwords do not match.", error: true });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setMessage({ text: error.message, error: true });
      return;
    }
    setMessage({ text: "Password changed successfully.", error: false });
    toast.success("Password updated");
    setTimeout(onClose, 700);
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/[.82] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Change password"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-[470px] border border-[#49422f] bg-[#11110f] p-6"
      >
        <h2 className="font-display text-[25px] font-semibold">Change Admin Password</h2>
        <p className="mt-2 text-[11px] leading-relaxed text-[#999286]">
          Choose a new password. Use at least 8 characters.
        </p>

        <label className={`${fieldLabel} mt-6`} htmlFor="cp-new">
          New password
        </label>
        <input
          id="cp-new"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className={`${fieldLabel} mt-4`} htmlFor="cp-confirm">
          Confirm new password
        </label>
        <input
          id="cp-confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={fieldInput}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {message && (
          <p
            className={`mt-3 text-[11px] leading-relaxed ${message.error ? "text-[#e99]" : "text-[#9fd29f]"}`}
          >
            {message.text}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={onClose} className={btn}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={`${btn} ${btnPrimary}`}>
            {busy ? "Saving…" : "Save Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
