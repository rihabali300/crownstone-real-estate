import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BUCKET = "property-images";

export function ImageManager({
  propertyId,
  paths,
  onChange,
}: {
  propertyId: string;
  paths: string[];
  onChange: (paths: string[]) => void;
}) {
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    let active = true;
    const storagePaths = paths.filter((p) => !p.startsWith("http"));
    if (storagePaths.length === 0) {
      setPreviews({});
      return;
    }
    supabase.storage
      .from(BUCKET)
      .createSignedUrls(storagePaths, 3600)
      .then(({ data }) => {
        if (!active || !data) return;
        const next: Record<string, string> = {};
        storagePaths.forEach((path, i) => {
          const url = data[i]?.signedUrl;
          if (url) next[path] = url;
        });
        setPreviews(next);
      });
    return () => {
      active = false;
    };
  }, [paths]);

  async function upload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${propertyId}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });
        if (error) throw error;
        uploaded.push(path);
      }
      onChange([...paths, ...uploaded]);
      toast.success(`${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(path: string) {
    if (!path.startsWith("http")) {
      await supabase.storage.from(BUCKET).remove([path]);
    }
    onChange(paths.filter((p) => p !== path));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= paths.length) return;
    const next = [...paths];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item!);
    onChange(next);
  }

  function makeCover(index: number) {
    if (index === 0) return;
    const next = [...paths];
    const [item] = next.splice(index, 1);
    onChange([item!, ...next]);
  }

  const iconButton =
    "grid size-8 place-items-center border border-border bg-background/80 text-foreground/80 transition-colors duration-300 hover:border-gold hover:text-gold disabled:opacity-30";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow-muted">Images — first image is the cover</p>
        <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-gold hover:text-gold">
          <Upload size={13} aria-hidden="true" />
          {uploading ? "Uploading…" : "Upload images"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void upload(e.target.files)}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <input
          type="url"
          placeholder="https://… image URL"
          aria-label="Image URL"
          className="min-h-11 min-w-0 flex-1 border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 focus:border-gold"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="button"
          className="min-h-11 border border-border px-5 text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-gold hover:text-gold"
          onClick={() => {
            const url = imageUrl.trim();
            if (!/^https?:\/\/\S+$/i.test(url)) {
              toast.error("Enter a valid image URL starting with https://");
              return;
            }
            if (paths.includes(url)) {
              toast.error("That image URL is already added");
              return;
            }
            onChange([...paths, url]);
            setImageUrl("");
          }}
        >
          Add URL
        </button>
      </div>


      {paths.length === 0 ? (
        <p className="mt-4 border border-border bg-surface p-5 text-xs text-muted-foreground">
          No images yet. Placeholder design images are shown on the public site until you
          upload the real photography.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {paths.map((path, index) => (
            <li key={path} className="border border-border bg-surface">
              <div className="relative aspect-[3/2] overflow-hidden">
                {previews[path] || path.startsWith("http") ? (
                  <img
                    src={path.startsWith("http") ? path : previews[path]}
                    alt={`Property image ${index + 1}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="size-full animate-pulse bg-card" />
                )}
                {index === 0 && (
                  <span className="absolute left-2 top-2 border border-gold/60 bg-background/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-gold">
                    Cover
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 p-2">
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Move image earlier"
                >
                  <ArrowLeft size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => move(index, 1)}
                  disabled={index === paths.length - 1}
                  aria-label="Move image later"
                >
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  onClick={() => makeCover(index)}
                  aria-label="Set as cover image"
                >
                  <Star size={13} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`${iconButton} ml-auto hover:border-destructive hover:text-destructive`}
                  onClick={() => void remove(path)}
                  aria-label="Delete image"
                >
                  <Trash2 size={13} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
