import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { useLanguage } from "../i18n/Language";
import { sapAchievements } from "./Certifications";
import documents from "../data/certificateDocuments.json";

// Keep the in-progress achievement first and unavailable documents last.
const certificates = [
 ...sapAchievements.filter(item => item.pending),
 ...sapAchievements.filter(item => documents[item.title]).map(item => ({ ...item, document: documents[item.title] })),
 ...Object.keys(documents).filter(title => !sapAchievements.some(item => item.title === title)).map(title => ({ title, document: documents[title] })),
 ...sapAchievements.filter(item => !item.pending && !documents[item.title])
];
export default function CertificateShowcase({ forward, reverse, reduced }) {
 const { language } = useLanguage(); const fr = language === "fr";
 const split = Math.ceil(certificates.length / 2);
 return <section className="certificate-showcase" aria-label={fr ? "Aperçu des certifications" : "Certificates preview"}>
  <div className="showcase-heading"><span className="eyebrow">{fr ? "MON PARCOURS / CERTIFICATIONS" : "MY JOURNEY / CREDENTIALS"}</span><Link to="/certifications">{fr ? "Toutes les certifications" : "All certifications"}<ArrowUpRight size={16}/></Link></div>
  <div className="project-showcase certificate-parallax">
   {[certificates.slice(0,split),certificates.slice(split)].map((row,index) => <motion.div key={index} className="showcase-row" style={{ x: reduced ? 0 : index === 0 ? forward : reverse }}>{row.map(item => <Link key={item.title} to="/certifications" className="showcase-card certificate-showcase-card"><div className="showcase-image">{item.document ? <img src={`${process.env.PUBLIC_URL}/certificates/${item.document.file}.webp`} width={item.document.width} height={item.document.height} alt={item.title} loading="lazy" decoding="async"/> : <div className="certificate-placeholder"><Clock3 size={30}/><span>{item.pending ? (fr ? "En cours" : "In progress") : (fr ? "Attestation non disponible" : "Document not available")}</span></div>}</div><div className="showcase-caption"><h2>{item.title}</h2><ArrowUpRight size={18}/></div></Link>)}</motion.div>)}
  </div>
 </section>;
}
