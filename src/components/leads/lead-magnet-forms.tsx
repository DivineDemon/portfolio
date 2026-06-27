"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Download, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
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
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/track";
import { submitLeadCapture } from "@/lib/leads/submit-lead";

const emailCaptureSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email address"),
});

type EmailCaptureValues = z.infer<typeof emailCaptureSchema>;

type LeadMagnetCaptureFormProps = {
  magnetSlug: string;
  magnetTitle: string;
  pdfUrl?: string | null;
};

export function LeadMagnetCaptureForm({
  magnetSlug,
  magnetTitle,
  pdfUrl,
}: LeadMagnetCaptureFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<EmailCaptureValues>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: { name: "", email: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: EmailCaptureValues) {
    const result = await submitLeadCapture({
      email: values.email,
      name: values.name,
      magnetSlug,
    });

    if (!result.success) {
      toast.error(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    trackEvent(ANALYTICS_EVENTS.LEAD_MAGNET_SUBMIT, {
      magnet_slug: magnetSlug,
      magnet_title: magnetTitle,
      magnet_type: "pdf",
    });

    setSubmitted(true);
    toast.success("Check your download below.");

    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6">
        <p className="font-mono text-sm leading-relaxed text-foreground">
          Thanks — your download should have opened in a new tab. If not, use
          the button below.
        </p>
        {pdfUrl && (
          <Button asChild className="mt-4" variant="outline">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" />
              Download {magnetTitle}
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-border bg-muted/30 p-6"
    >
      <p className="mb-4 font-mono text-sm leading-relaxed text-muted-foreground">
        Enter your details to download the PDF instantly.
      </p>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor={`lead-name-${magnetSlug}`}>Name</FieldLabel>
          <Input
            id={`lead-name-${magnetSlug}`}
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor={`lead-email-${magnetSlug}`}>
            Work email
          </FieldLabel>
          <Input
            id={`lead-email-${magnetSlug}`}
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Download className="size-4" />
            Get the PDF
          </>
        )}
      </Button>
    </form>
  );
}

const calculatorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email address"),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

type ExecutiveRoiCalculatorProps = {
  magnetSlug: string;
  magnetTitle: string;
};

export function ExecutiveRoiCalculator({
  magnetSlug,
  magnetTitle,
}: ExecutiveRoiCalculatorProps) {
  const [teamSize, setTeamSize] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [hourlyCost, setHourlyCost] = useState(75);
  const [automationSavingsPct, setAutomationSavingsPct] = useState(40);
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    const weeklyManualCost = teamSize * hoursPerWeek * hourlyCost;
    const annualManualCost = weeklyManualCost * 52;
    const annualSavings = annualManualCost * (automationSavingsPct / 100);
    const monthlySavings = annualSavings / 12;

    return { annualManualCost, annualSavings, monthlySavings };
  }, [teamSize, hoursPerWeek, hourlyCost, automationSavingsPct]);

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: { name: "", email: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: CalculatorFormValues) {
    const result = await submitLeadCapture({
      email: values.email,
      name: values.name,
      magnetSlug,
      metadata: {
        teamSize,
        hoursPerWeek,
        hourlyCost,
        automationSavingsPct,
        annualManualCost: Math.round(results.annualManualCost),
        annualSavings: Math.round(results.annualSavings),
        monthlySavings: Math.round(results.monthlySavings),
      },
    });

    if (!result.success) {
      toast.error(result.error ?? "Something went wrong. Please try again.");
      return;
    }

    trackEvent(ANALYTICS_EVENTS.LEAD_MAGNET_SUBMIT, {
      magnet_slug: magnetSlug,
      magnet_title: magnetTitle,
      magnet_type: "calculator",
      annual_savings: Math.round(results.annualSavings),
    });

    setSubmitted(true);
    toast.success("Your ROI summary is ready.");
  }

  return (
    <div className="space-y-6 rounded-lg border border-border bg-muted/30 p-6">
      <div className="flex items-center gap-2 font-mono text-sm font-semibold">
        <Calculator className="size-4" />
        Executive ROI calculator
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="team-size">Team size affected</FieldLabel>
          <Input
            id="team-size"
            type="number"
            min={1}
            value={teamSize}
            onChange={(event) => setTeamSize(Number(event.target.value))}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="hours-week">
            Manual hours / person / week
          </FieldLabel>
          <Input
            id="hours-week"
            type="number"
            min={1}
            value={hoursPerWeek}
            onChange={(event) => setHoursPerWeek(Number(event.target.value))}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="hourly-cost">
            Loaded hourly cost (USD)
          </FieldLabel>
          <Input
            id="hourly-cost"
            type="number"
            min={1}
            value={hourlyCost}
            onChange={(event) => setHourlyCost(Number(event.target.value))}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="savings-pct">
            Expected automation savings (%)
          </FieldLabel>
          <Input
            id="savings-pct"
            type="number"
            min={5}
            max={90}
            value={automationSavingsPct}
            onChange={(event) =>
              setAutomationSavingsPct(Number(event.target.value))
            }
          />
        </Field>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => setShowResults(true)}
      >
        Calculate ROI
      </Button>

      {showResults && (
        <div className="space-y-2 rounded-md border border-border bg-background p-4 font-mono text-sm">
          <p>
            Estimated annual cost of manual work:&nbsp;
            <strong>
              ${Math.round(results.annualManualCost).toLocaleString()}
            </strong>
          </p>
          <p>
            Potential annual savings at {automationSavingsPct}%
            automation:&nbsp;
            <strong>
              ${Math.round(results.annualSavings).toLocaleString()}
            </strong>
          </p>
          <p className="text-muted-foreground">
            ~${Math.round(results.monthlySavings).toLocaleString()} / month back
            in capacity
          </p>
        </div>
      )}

      {showResults && !submitted && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 border-t border-border pt-4"
        >
          <p className="font-mono text-sm text-muted-foreground">
            Email your personalized summary and next-step recommendations.
          </p>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor={`calc-name-${magnetSlug}`}>Name</FieldLabel>
              <Input id={`calc-name-${magnetSlug}`} {...register("name")} />
              <FieldError errors={errors.name ? [errors.name] : undefined} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor={`calc-email-${magnetSlug}`}>
                Work email
              </FieldLabel>
              <Input
                id={`calc-email-${magnetSlug}`}
                type="email"
                {...register("email")}
              />
              <FieldError errors={errors.email ? [errors.email] : undefined} />
            </Field>
          </FieldGroup>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Email my ROI summary"
            )}
          </Button>
        </form>
      )}

      {submitted && (
        <p className="font-mono text-sm text-foreground">
          Thanks — I&apos;ll follow up with a tailored automation roadmap based
          on your inputs.
        </p>
      )}
    </div>
  );
}
