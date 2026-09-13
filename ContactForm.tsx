import { useState } from "react";
import { z } from "zod";
import { ActionButton } from "./ActionButton";

const schema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Please enter your full name." })
    .max(100, { message: "Name must be less than 100 characters." }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: "Please enter a phone or WhatsApp number." })
    .max(30, { message: "Phone number must be less than 30 characters." }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email must be less than 255 characters." })
    .email({ message: "Please enter a valid email address." })
    .optional()
    .or(z.literal("")),
  interest: z.string().trim().nonempty({ message: "Please select an option." }),
  location: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Message must be less than 1000 characters." })
    .optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const inputClass =
  "min-h-11 w-full border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-gold";
const labelClass = "eyebrow-muted mb-3 block";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-gold/40 bg-card p-10 text-center">
        <p className="eyebrow">Enquiry received</p>
        <p className="mt-5 font-display text-2xl leading-snug">
          Thank you. Your enquiry has been received. A Crownstone representative will
          contact you shortly.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          Note: form delivery requires a backend connection (email or CRM) before going
          live.
        </p>
        <ActionButton
          variant="outline"
          size="sm"
          className="mt-8"
          onClick={() => setSent(false)}
        >
          Send another enquiry
        </ActionButton>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const result = schema.safeParse(data);
        if (!result.success) {
          const next: Errors = {};
          for (const issue of result.error.issues) {
            const key = issue.path[0] as keyof Errors;
            if (!next[key]) next[key] = issue.message;
          }
          setErrors(next);
          return;
        }
        setErrors({});
        setSent(true);
      }}
      className="border border-border bg-card p-7 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            className={inputClass}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="+971 00 000 0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="interest">
            I'm interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue="Buying"
            className={`${inputClass} appearance-none`}
          >
            <option>Buying</option>
            <option>Selling</option>
            <option>Renting</option>
            <option>Investing</option>
            <option>Property Consultation</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="location">
            Preferred Location
          </label>
          <input
            id="location"
            name="location"
            className={inputClass}
            placeholder="[Search location]"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="budget">
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            className={inputClass}
            placeholder="[Budget range]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Tell us what you're looking for."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <ActionButton type="submit" size="block" className="mt-8">
        Send Enquiry
      </ActionButton>
    </form>
  );
}
