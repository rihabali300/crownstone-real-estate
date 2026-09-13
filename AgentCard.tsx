import { Mail, Phone, User } from "lucide-react";
import { ActionLink } from "./ActionButton";

export function AgentCard({
  name,
  role,
  phone,
  email,
}: {
  name: string;
  role: string;
  phone: string;
  email: string;
}) {
  return (
    <article className="border border-border bg-card">
      <div className="grid aspect-[4/5] place-items-center border-b border-border bg-surface">
        <div className="text-center">
          <User size={30} className="mx-auto text-muted-foreground" aria-hidden="true" />
          <p className="eyebrow-muted mt-4">[Agent Photo]</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl">{name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{role}</p>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li className="inline-flex items-center gap-2">
            <Phone size={14} aria-hidden="true" /> {phone}
          </li>
          <li className="flex items-center gap-2">
            <Mail size={14} aria-hidden="true" /> {email}
          </li>
        </ul>
        <ActionLink to="/contact" variant="outline" size="sm" className="mt-6">
          Contact Agent
        </ActionLink>
      </div>
    </article>
  );
}
