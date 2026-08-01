import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MaxWidthWrapper from "../max-width-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Quote from "../ui/quote";
import SectionBadge from "../ui/section-badge";
import { Textarea } from "../ui/textarea";

const contactSchema = z.object({
  from_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  from_email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long." })
    .max(150, { message: "Subject cannot exceed 150 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(2000, { message: "Message cannot exceed 2000 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      from_name: "",
      from_email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const serviceId = import.meta.env.EMAILJS_SERVICE_ID || import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId =
      import.meta.env.EMAILJS_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("EmailJS configuration parameters missing in environment variables.");
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, data, publicKey);
      toast.success(
        "Message sent successfully! I will review your inquiry and get back to you shortly.",
      );
      reset();
    } catch (error) {
      console.error("EmailJS submission error:", error);
      toast.error("Failed to send message via EmailJS. Please try again or email directly.");
    }
  };

  return (
    <MaxWidthWrapper
      className="flex min-h-screen w-full flex-col items-center justify-center gap-12 py-16"
      id="contact"
    >
      <div className="flex w-full flex-col items-start justify-center gap-5">
        <SectionBadge label="get in touch" />
        <h2 className="font-bold font-heading text-6xl md:text-7xl">Hard problems welcome.</h2>
        <Quote text="Heads-down building right now - not looking for roles. But if you've got a hard problem, a wild idea, or just want to talk shop about LLMs, distributed systems, scientific ML, or why this site is unreasonably over-engineered for a portfolio, I'm always up for that." />
      </div>

      <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="from_name">Your Name *</Label>
            <Input
              id="from_name"
              placeholder="e.g. Alex Turner"
              {...register("from_name")}
              className={
                errors.from_name ? "border-destructive focus-visible:ring-destructive" : ""
              }
            />
            {errors.from_name && (
              <span className="font-medium text-[11px] text-destructive">
                {errors.from_name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="from_email">Your Email *</Label>
            <Input
              id="from_email"
              placeholder="e.g. alex@company.com"
              type="email"
              {...register("from_email")}
              className={
                errors.from_email ? "border-destructive focus-visible:ring-destructive" : ""
              }
            />
            {errors.from_email && (
              <span className="font-medium text-[11px] text-destructive">
                {errors.from_email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            placeholder="e.g. Enterprise AI Systems Architecture Inquiry"
            {...register("subject")}
            className={errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.subject && (
            <span className="font-medium text-[11px] text-destructive">
              {errors.subject.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            placeholder="Describe your project, architecture requirements, or inquiry..."
            {...register("message")}
            className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.message && (
            <span className="font-medium text-[11px] text-destructive">
              {errors.message.message}
            </span>
          )}
        </div>

        <Button
          className="mt-2 h-12 w-full rounded-xl font-semibold text-sm transition-all"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send Inquiry
            </>
          )}
        </Button>
      </form>
    </MaxWidthWrapper>
  );
};

export default Contact;
