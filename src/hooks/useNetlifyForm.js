import { useState } from "react";

export function useNetlifyForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending", message: "Sending your form…" });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      setStatus({ state: "success", message: "Your form was submitted. Thank you; the Foundation will follow up." });
    } catch {
      setStatus({ state: "error", message: "We could not submit your form. Please try again or contact us by WhatsApp or email." });
    }
  }

  return { status, handleSubmit };
}
