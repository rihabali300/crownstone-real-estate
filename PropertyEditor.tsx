import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ImageManager } from "@/components/admin/ImageManager";
import { VideoManager } from "@/components/admin/VideoManager";
import {
  currencyOptions,
  propertyTypes,
  purposeOptions,
  slugify,
  type PropertyRow,
} from "@/data/properties";

const fieldLabel = "mb-[7px] block text-[9px] uppercase tracking-[0.17em] text-[#999286]";
const fieldInput =
  "w-full border border-[#35342e] bg-[#0b0b0a] p-3 text-[15px] text-[#f4f1e8] outline-none transition-colors duration-200 focus:border-[#d9aa3d]";
const twoCol = "grid gap-[14px] sm:grid-cols-2";
const btn =
  "inline-flex min-h-[42px] items-center justify-center gap-2 border border-[#a77c21] bg-transparent px-4 text-[10px] uppercase tracking-[0.13em] text-[#d9aa3d] transition-colors duration-200";
const btnPrimary = "border-[#d9aa3d] bg-[#d9aa3d] text-[#111]";

export function PropertyEditor({
  property,
  onSaved,
  onClose,
}: {
  property: PropertyRow;
  onSaved: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PropertyRow>(property);
  const [amenityText, setAmenityText] = useState(property.amenities.join("\n"));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PropertyRow>(key: K, value: PropertyRow[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) {
      toast.error("Title and Location are required.");
      return;
    }
    setSaving(true);
    try {
      const amenities = amenityText
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean);
      const { error } = await supabase
        .from("properties")
        .update({
          name: form.name,
          slug: slugify(form.slug) || slugify(form.name) || form.id,
          price: form.price,
          currency: form.currency,
          purpose: form.purpose,
          property_type: form.property_type,
          location: form.location,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          area: form.area,
          description: form.description,
          amenities,
          developer: form.developer,
          featured: form.featured,
          published: true,
          agent_name: form.agent_name,
          agent_phone: form.agent_phone,
          agent_email: form.agent_email,
          images: form.images,
          map_location: form.map_location,
          video_url: form.video_url,
          brochure_url: form.brochure_url,
          investment_notes: form.investment_notes,
        })
        .eq("id", form.id);
      if (error) throw error;
      toast.success("Property saved");
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save property");
    } finally {
      setSaving(false);
    }
  }

  /** Images and video have their own storage side-effects, so they save the moment they change. */
  async function saveImages(paths: string[]) {
    set("images", paths);
    const { error } = await supabase
      .from("properties")
      .update({ images: paths })
      .eq("id", form.id);
    if (error) toast.error("Images uploaded but could not be linked to the property");
  }

  async function saveVideo(path: string) {
    set("video_url", path);
    const { error } = await supabase
      .from("properties")
      .update({ video_url: path })
      .eq("id", form.id);
    if (error) toast.error("Video uploaded but could not be linked to the property");
  }

  return (
    <form onSubmit={save}>
      <h2 className="font-display text-[31px] font-semibold">
        {property.name === "[Property Name]" ? "Add Property" : "Edit Property"}
      </h2>

      <div className={`${twoCol} mt-5`}>
        <div>
          <label className={fieldLabel} htmlFor="p-name">
            Title
          </label>
          <input
            id="p-name"
            required
            className={fieldInput}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-slug">
            Slug
          </label>
          <input
            id="p-slug"
            required
            className={fieldInput}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
          />
        </div>
      </div>

      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-type">
            Type
          </label>
          <select
            id="p-type"
            className={fieldInput}
            value={form.property_type}
            onChange={(e) => set("property_type", e.target.value)}
          >
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-purpose">
            Status
          </label>
          <select
            id="p-purpose"
            className={fieldInput}
            value={form.purpose}
            onChange={(e) => set("purpose", e.target.value)}
          >
            {purposeOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-location">
            Location
          </label>
          <input
            id="p-location"
            required
            className={fieldInput}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-price">
            Price
          </label>
          <div className="flex gap-2">
            <select
              aria-label="Currency"
              className={`${fieldInput} w-24 shrink-0`}
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
            >
              {currencyOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              id="p-price"
              type="number"
              min="0"
              placeholder="2,500,000"
              className={fieldInput}
              value={form.price ?? ""}
              onChange={(e) =>
                set("price", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-beds">
            Bedrooms
          </label>
          <input
            id="p-beds"
            className={fieldInput}
            value={form.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-baths">
            Bathrooms
          </label>
          <input
            id="p-baths"
            className={fieldInput}
            value={form.bathrooms}
            onChange={(e) => set("bathrooms", e.target.value)}
          />
        </div>
      </div>

      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-area">
            Area
          </label>
          <input
            id="p-area"
            placeholder="1,250 sq.ft."
            className={fieldInput}
            value={form.area}
            onChange={(e) => set("area", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-developer">
            Developer
          </label>
          <input
            id="p-developer"
            className={fieldInput}
            value={form.developer}
            onChange={(e) => set("developer", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={fieldLabel}>Property Images</label>
        <ImageManager
          propertyId={form.id}
          paths={form.images}
          onChange={(paths) => void saveImages(paths)}
        />
      </div>

      <div className="mt-5">
        <label className={fieldLabel}>Property Video</label>
        <VideoManager
          propertyId={form.id}
          value={form.video_url}
          onChange={(path) => void saveVideo(path)}
        />
        <label className={`${fieldLabel} mt-3`} htmlFor="p-video-url">
          Video URL (optional)
        </label>
        <input
          id="p-video-url"
          placeholder="https://…"
          className={fieldInput}
          value={form.video_url.startsWith("http") ? form.video_url : ""}
          onChange={(e) => set("video_url", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className={fieldLabel} htmlFor="p-description">
          Description
        </label>
        <textarea
          id="p-description"
          rows={5}
          className={`${fieldInput} min-h-[100px] resize-y`}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className={fieldLabel} htmlFor="p-amenities">
          Amenities (one per line)
        </label>
        <textarea
          id="p-amenities"
          rows={5}
          className={`${fieldInput} min-h-[100px] resize-y`}
          value={amenityText}
          onChange={(e) => setAmenityText(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className={fieldLabel} htmlFor="p-investment">
          Investment information
        </label>
        <textarea
          id="p-investment"
          rows={4}
          className={`${fieldInput} min-h-[100px] resize-y`}
          value={form.investment_notes}
          onChange={(e) => set("investment_notes", e.target.value)}
        />
      </div>

      {/* The uploaded design doesn't cover these, but the public site's contact block,
          location section and brochure link depend on them — kept so a property added
          here still works fully on the live property page. */}
      <h3 className="mt-8 border-t border-[#2c2b26] pt-6 font-display text-xl font-semibold">
        Agent &amp; Additional Details
      </h3>
      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-agent">
            Agent name
          </label>
          <input
            id="p-agent"
            className={fieldInput}
            value={form.agent_name}
            onChange={(e) => set("agent_name", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-agent-phone">
            Agent phone
          </label>
          <input
            id="p-agent-phone"
            className={fieldInput}
            value={form.agent_phone}
            onChange={(e) => set("agent_phone", e.target.value)}
          />
        </div>
      </div>
      <div className={`${twoCol} mt-4`}>
        <div>
          <label className={fieldLabel} htmlFor="p-agent-email">
            Agent email
          </label>
          <input
            id="p-agent-email"
            type="email"
            className={fieldInput}
            value={form.agent_email}
            onChange={(e) => set("agent_email", e.target.value)}
          />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="p-map">
            Map location
          </label>
          <input
            id="p-map"
            className={fieldInput}
            value={form.map_location}
            onChange={(e) => set("map_location", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className={fieldLabel} htmlFor="p-brochure">
          Brochure URL
        </label>
        <input
          id="p-brochure"
          className={fieldInput}
          value={form.brochure_url}
          onChange={(e) => set("brochure_url", e.target.value)}
        />
      </div>

      <label className="mt-5 inline-flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="size-4 accent-[#d9aa3d]"
        />
        Feature on homepage
      </label>

      <div className="mt-7 flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className={`${btn} ${btnPrimary}`}>
          {saving ? "Saving…" : "Save Property"}
        </button>
        <button type="button" onClick={onClose} className={btn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
