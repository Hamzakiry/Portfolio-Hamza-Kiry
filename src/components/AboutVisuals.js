import { ArrowUpRight, Mail, Database, BrainCircuit, Network } from "lucide-react";
import houseImage from "../images/Pro6.webp";
import erpImage from "../images/Pro10.webp";
import { Link } from "react-router-dom";

export function ProjectsVisual() {
  return <Link to="/projects" className="about-project-visual" aria-label="Explore my AI and data projects"><div className="visual-projects"><img src={erpImage} alt="Odoo AI quotation project" loading="lazy"/><img src={houseImage} alt="House price prediction project" loading="lazy"/></div><span>AI / DATA / ENTERPRISE <ArrowUpRight size={16}/></span></Link>;
}
export function ContactVisual() {
  return <a className="about-contact-visual" href="mailto:hamza.kiry2@gmail.com" aria-label="Contact Hamza Kiry by email"><div className="contact-visual-network"><span><BrainCircuit size={19}/></span><span className="contact-mail-icon"><Mail size={35}/></span><span><Database size={19}/></span><span><Network size={19}/></span></div><span>LET’S CONNECT <ArrowUpRight size={16}/></span></a>;
}
