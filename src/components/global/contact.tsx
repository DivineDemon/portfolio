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
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/lib/emailjs";
import Silk from "../ui/silk";

const contactSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100),
  message: z.string().min(1, "Message is required").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
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
      toast.success("Message sent successfully");
      form.reset();
    } else {
      toast.error(result.error || "Failed to send message");
    }
  }

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div
        id="contact"
        className="w-full relative min-h-[70vh] md:min-h-[60vh]"
      >
        <div className="absolute inset-0 invert dark:invert-0 w-full h-full">
          <Silk
            speed={5}
            scale={1}
            rotation={0}
            color="#7B7481"
            noiseIntensity={1.5}
          />
        </div>
        <div className="absolute inset-0 w-full max-w-[90%] md:max-w-2/3 mx-auto flex flex-col items-center justify-center py-12 px-4">
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
                <FieldError
                  errors={errors.email ? [errors.email] : undefined}
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
                <FieldError
                  errors={errors.message ? [errors.message] : undefined}
                />
              </Field>
            </FieldGroup>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Contact;
