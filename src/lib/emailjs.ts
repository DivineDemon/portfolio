"use server";

import emailjs from "@emailjs/nodejs";

export type SendContactEmailParams = {
  name: string;
  email: string;
  message: string;
};

export type SendContactEmailResult =
  | { success: true }
  | { success: false; error: string };

export async function sendContactEmail(
  params: SendContactEmailParams,
): Promise<SendContactEmailResult> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return {
      success: false,
      error: "Email service is not configured. Please try again later.",
    };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: params.name,
        from_email: params.email,
        message: params.message,
        reply_to: params.email,
      },
      {
        publicKey,
        privateKey,
      },
    );
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send message.";
    return { success: false, error: message };
  }
}
