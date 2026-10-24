import { useRef, useState } from "react";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import { useLanguage } from "./i18n/Language";

export function messageEmailLink(name, message, language) {
  const subject = language === "fr" ? "Contact pour un stage PFE" : "Final-year internship enquiry";
  return `mailto:hamza.kiry2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${name.trim()}\n\n${message.trim()}`)}`;
}
export default function Contact() {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const fields = useRef(null);
  const [invalid, setInvalid] = useState(false);
  function prepare(event) {
    if (!name.trim() || !message.trim()) {
      event.preventDefault();
      setInvalid(true);
      fields.current?.reportValidity();
    } else { setInvalid(false); }
  }
  return <div className="portfolio-site"><PortfolioNav/>
    <main id="main-content" tabIndex={-1} className="contact-page">
      <div className="projects-heading"><span className="eyebrow">{t("CONTACT / START A CONVERSATION")}</span><h1>{t("Let’s discuss a final-year internship.")}</h1><p>{t("I’m seeking a six-month final-year internship in France, available from March 2027. Leave your name and message to discuss an opportunity.")}</p></div>
      <div className="contact-page-grid">
        <form ref={fields} className="resume-card contact-form" onSubmit={event => event.preventDefault()} aria-label={t("Contact")}>
          <label htmlFor="contact-name">{t("Name")}<input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)}/></label>
          <label htmlFor="contact-message">{t("Message")}<textarea id="contact-message" name="message" required rows={7} maxLength={2000} value={message} onChange={event => setMessage(event.target.value)}/></label>
          <p className="form-notice" id="email-notice">{t("This opens your email app. No message is sent automatically.")}</p>
          <a className="primary-button" href={messageEmailLink(name, message, language)} onClick={prepare} aria-describedby="email-notice">{t("Open email app")}<ArrowUpRight size={17}/></a>
          <p className="form-status invalid" role="status" aria-live="polite">{invalid ? t("Please enter your name and message.") : ""}</p>
        </form>
        <aside className="contact-options resume-card"><h2>{t("Let’s connect")}</h2><a href="mailto:hamza.kiry2@gmail.com"><Mail size={20}/><span>{t("Write an email")}<small>hamza.kiry2@gmail.com</small></span></a><a href="https://www.linkedin.com/in/hamza-kiry-750270349/" target="_blank" rel="noopener noreferrer"><Linkedin size={20}/><span>{t("Open LinkedIn")}<small>Hamza Kiry</small></span></a></aside>
      </div>
    </main><PortfolioFooter/></div>;
}
