import { useEffect, useRef, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { embedVideoUrl } from "@/lib/media";

const BUCKET = "property-videos";

/** Single-video upload + preview, mirroring ImageManager's storage pattern. */
export function VideoManager({
  propertyId,
  value,
  onChange,
}: {
  propertyId: string;
  value: string;
  onChange: (path: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    const trimmed = value.trim();
    if (!trimmed || trimmed.startsWith("http")) {
      setPreview(trimmed.startsWith("http") ? trimmed : null);
      return;
    }
    supabase.storage
      .from(BUCKET)
      .createSignedUrl(trimmed, 3600)
      .then(({ data }) => {
        if (active) setPreview(data?.signedUrl ?? null);
      });
    return () => {
      active = false;
    };
  }, [value]);

  async function upload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      if (value && !value.startsWith("http")) {
        await supabase.storage.from(BUCKET).remove([value]);
      }
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
      const path = `${propertyId}/${crypto.randomUUID()}.${extension}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      onChange(path);
      toast.success("Video uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Video upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove() {
    if (value && !value.startsWith("http")) {
      await supabase.storage.from(BUCKET).remove([value]);
    }
    onChange("");
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow-muted">Property video</p>
        <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-gold hover:text-gold">
          <Upload size={13} aria-hidden="true" />
          {uploading ? "Uploading…" : "Upload video"}
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => void upload(e.target.files)}
          />
        </label>
      </div>

      {preview ? (
        <div className="mt-4">
          <div className="aspect-video w-full border border-border bg-surface">
            {embedVideoUrl(preview) ? (
              <iframe
                src={embedVideoUrl(preview)!}
                title="Property video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            ) : (
              <video src={preview} controls className="size-full object-cover" />
            )}
          </div>
          <button
            type="button"
            onClick={() => void remove()}
            className="mt-3 inline-flex items-center gap-2 border border-border px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:border-destructive hover:text-destructive"
          >
            <Trash2 size={13} aria-hidden="true" /> Remove video
          </button>
        </div>
      ) : (
        <p className="mt-4 border border-border bg-surface p-5 text-xs text-muted-foreground">
          No video uploaded yet. Paste a YouTube, Vimeo or direct link above, or upload a
          file.
        </p>
      )}
    </div>
  );
}
