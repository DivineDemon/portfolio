"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import { sendContactEmail } from "@/lib/emailjs";

const contactSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100),
  coreProblem: z
    .string()
    .min(10, "Please describe the core problem (at least 10 characters)")
    .max(500),
  message: z.string().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      coreProblem: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: ContactFormValues) {
    const result = await sendContactEmail(values);

    if (result.success) {
      trackEvent(ANALYTICS_EVENTS.LEAD_FORM_SUBMIT, {
        form_location: "contact",
      });
      toast.success("Message sent successfully");
      form.reset();
    } else {
      toast.error(result.error || "Failed to send message");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md flex flex-col gap-6"
    >
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">Name</FieldLabel>
          <Input
            id="contact-name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className="border-black/25 dark:border-border"
            {...register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">Email</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="border-black/25 dark:border-border"
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>
        <Field data-invalid={!!errors.coreProblem}>
          <FieldLabel htmlFor="contact-core-problem">
            What&apos;s the core problem you&apos;re trying to solve?
          </FieldLabel>
          <Textarea
            id="contact-core-problem"
            placeholder="e.g. Our SaaS can't scale past 500 tenants without performance issues..."
            rows={3}
            className="min-h-[88px] resize-none border-black/25 dark:border-border"
            aria-invalid={!!errors.coreProblem}
            {...register("coreProblem")}
          />
          <FieldError
            errors={errors.coreProblem ? [errors.coreProblem] : undefined}
          />
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            placeholder="Your message..."
            rows={5}
            className="min-h-[120px] resize-none border-black/25 dark:border-border"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Send message"}
      </Button>
    </form>
  );
};

export default ContactForm;
