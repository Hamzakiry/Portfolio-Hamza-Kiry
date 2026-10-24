import { Text, useLanguage } from "../i18n/Language";
import { ArrowUpRight, Mail, Database, BrainCircuit, Network } from "lucide-react";
import houseImage from "../images/Pro6.webp";
import erpImage from "../images/Pro10.webp";
import { Link } from "react-router-dom";

export function ProjectsVisual() {
  const { t } = useLanguage();
  return <Link to="/projects" className="about-project-visual" aria-label={t("Explore my AI and data projects")}><div className="visual-projects"><img src={erpImage} alt={t("Odoo AI quotation project")} loading="lazy"/><img src={houseImage} alt={t("House price prediction project")} loading="lazy"/></div><span><Text value={"AI / DATA / ENTERPRISE "}/><ArrowUpRight size={16}/></span></Link>;
}
export function ContactVisual() {
  const { t } = useLanguage();
  return <Link className="about-contact-visual" to="/contact" aria-label={t("Contact")}><div className="contact-visual-network"><span><BrainCircuit size={19}/></span><span className="contact-mail-icon"><Mail size={35}/></span><span><Database size={19}/></span><span><Network size={19}/></span></div><span><Text value={"LET’S CONNECT "}/><ArrowUpRight size={16}/></span></Link>;
}
