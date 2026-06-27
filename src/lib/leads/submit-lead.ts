type SubmitLeadInput = {
  email: string;
  name?: string;
  magnetSlug: string;
  metadata?: Record<string, unknown>;
};

type SubmitLeadResult = { success: true } | { success: false; error?: string };

export async function submitLeadCapture(
  input: SubmitLeadInput,
): Promise<SubmitLeadResult> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      return {
        success: false,
        error: body?.message ?? "Failed to submit. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
