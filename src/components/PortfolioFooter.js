import { Text, useLanguage } from "../i18n/Language";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function PortfolioFooter() {
  const { t } = useLanguage();
  return <footer id="contact" className="portfolio-footer">
    <div className="contact-inner">
      <div><span className="eyebrow"><Text value={"CONTACT / LET’S CONNECT"}/></span><h2><Text value={"Looking for an AI & Big Data intern?"}/><br/><span><Text value={"Let’s connect."}/></span></h2><p><Text value={"I’m seeking a final-year internship in AI, Big Data or enterprise AI. I’d be happy to discuss an opportunity with your team."}/></p><Link to="/contact" className="secondary-button footer-form-link"><Text value="Send a message"/><ArrowUpRight size={16}/></Link></div>
      <a className="contact-email" href="mailto:hamza.kiry2@gmail.com"><Mail size={24}/><span><Text value={"hamza.kiry2@gmail.com"}/></span><ArrowUpRight size={24}/></a>
    </div>
    <div className="footer-inner">
      <div><Link to="/" className="brand"><Text value={"Hamza Kiry"}/><span className="accent"><Text value={"."}/></span></Link><p><Text value={"AI & Big Data engineering portfolio · SAP BTP & SAP Business AI Platform."}/></p></div>
      <nav aria-label={t("Footer navigation")}><Link to="/"><Text value={"Home"}/></Link><Link to="/projects"><Text value={"Projects"}/></Link><Link to="/contact"><Text value={"Contact"}/></Link></nav>
      <div className="social-links"><a href="https://github.com/hamzakiry" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a><a href="https://www.linkedin.com/in/hamza-kiry-750270349/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a><a href="mailto:hamza.kiry2@gmail.com" aria-label="Email"><Mail size={20}/></a></div>
    </div>
    <div className="footer-bottom"><span><Text value={"© Hamza Kiry "}/>{new Date().getFullYear()}<Text value={" · All rights reserved"}/></span><span><Text value={"Building. Learning. Creating."}/></span></div>
  </footer>;
}
