import { useEffect, useRef, useState } from "react";
import { Linkedin, Mail, Send } from "lucide-react";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import { useLanguage } from "./i18n/Language";

export const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/hamza.kiry2@gmail.com";
export async function sendContactMessage({ name, message, language, signal }) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name: name.trim(), message: message.trim(), _subject: language === "fr" ? "Contact pour un stage PFE" : "Final-year internship enquiry", _template: "table" }),
    signal,
  });
  const result = await response.json();
  if (/activat|confirm.*email|verif.*email/i.test(String(result.message || ""))) return "activation";
  if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Message not accepted");
  return "sent";
}
export default function Contact({ enabled = process.env.REACT_APP_CONTACT_ENABLED === "true" }) {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const fields = useRef(null);
  const submitting = useRef(false);
  const activeRequest = useRef(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; activeRequest.current?.abort(); }; }, []);
  async function submit(event) {
    event.preventDefault();
    if (!enabled || submitting.current) return;
    if (!name.trim() || !message.trim()) { setStatus("invalid"); fields.current?.reportValidity(); return; }
    submitting.current = true;
    setStatus("sending");
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const outcome = await sendContactMessage({ name, message, language, signal: controller.signal });
      if (!mounted.current || controller.signal.aborted) return;
      setStatus(outcome);
      if (outcome === "sent") { setName(""); setMessage(""); }
    } catch { if (mounted.current) setStatus("error"); }
    finally { clearTimeout(timeout); submitting.current = false; activeRequest.current = null; }
  }
  return <div className="portfolio-site"><PortfolioNav/>
    <main id="main-content" tabIndex={-1} className="contact-page">
      <div className="projects-heading"><span className="eyebrow">{t("CONTACT / START A CONVERSATION")}</span><h1>{t("Let’s discuss a final-year internship.")}</h1><p>{t("I’m seeking a six-month final-year internship in France, available from March 2027. Leave your name and message to discuss an opportunity.")}</p></div>
      <div className="contact-page-grid">
        <form ref={fields} className="resume-card contact-form" onSubmit={submit} aria-busy={status === "sending"} aria-label={t("Contact")}>
          <label htmlFor="contact-name">{t("Name")}<input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)}/></label>
          <label htmlFor="contact-message">{t("Message")}<textarea id="contact-message" name="message" required rows={7} maxLength={2000} value={message} onChange={event => setMessage(event.target.value)}/></label>
          <p className="form-notice" id="email-notice">{t(enabled ? "Your name and message are processed by FormSubmit to deliver your email." : "Direct sending is awaiting activation. You can still contact me by email or LinkedIn.")}</p>
          <button className="primary-button" type="submit" disabled={!enabled || status === "sending"} aria-describedby="email-notice">{t(status === "sending" ? "Sending…" : "Send message")}<Send size={17}/></button>
          <p className={`form-status ${status}`} role="status" aria-live="polite">{t(status === "sent" ? "The delivery service has accepted your message. Thank you!" : status === "activation" ? "Sending is awaiting email activation. Your message has not been confirmed as delivered." : status === "error" ? "The message could not be sent. Please try again or email me directly." : status === "invalid" ? "Please enter your name and message." : "")}</p>
        </form>
        <aside className="contact-options resume-card"><h2>{t("Let’s connect")}</h2><a href="mailto:hamza.kiry2@gmail.com"><Mail size={20}/><span>{t("Write an email")}<small>hamza.kiry2@gmail.com</small></span></a><a href="https://www.linkedin.com/in/hamza-kiry-750270349/" target="_blank" rel="noopener noreferrer"><Linkedin size={20}/><span>{t("Open LinkedIn")}<small>Hamza Kiry</small></span></a></aside>
      </div>
    </main><PortfolioFooter/></div>;
}
