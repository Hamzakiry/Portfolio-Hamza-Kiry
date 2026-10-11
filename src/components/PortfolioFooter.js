import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function PortfolioFooter() {
  return <footer id="contact" className="portfolio-footer">
    <div className="contact-inner">
      <div><span className="eyebrow">CONTACT / LET’S CONNECT</span><h2>Have an idea?<br/><span>Let’s build it together.</span></h2><p>I’m open to collaboration, freelance work, and new opportunities. Feel free to reach out and connect with me.</p></div>
      <a className="contact-email" href="mailto:hamza.kiry2@gmail.com"><Mail size={24}/><span>hamza.kiry2@gmail.com</span><ArrowUpRight size={24}/></a>
    </div>
    <div className="footer-inner">
      <div><Link to="/" className="brand">Hamza Kiry<span className="accent">.</span></Link><p>AI & Big Data engineering portfolio · SAP BTP & SAP Business AI Platform.</p></div>
      <nav aria-label="Footer navigation"><Link to="/">Home</Link><Link to="/projects">Projects</Link><button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</button></nav>
      <div className="social-links"><a href="https://github.com/hamzakiry" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20}/></a><a href="https://linkedin.com/in/hamza-kiry" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a><a href="mailto:hamza.kiry2@gmail.com" aria-label="Email"><Mail size={20}/></a></div>
    </div>
    <div className="footer-bottom"><span>© Hamza Kiry {new Date().getFullYear()} · All rights reserved</span><span>Building. Learning. Creating.</span></div>
  </footer>;
}
