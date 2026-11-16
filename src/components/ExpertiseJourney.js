import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Database, BrainCircuit, Workflow, ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/Language";
import { products } from "../profileData/projects";

const stages = [
  { icon: Database, label: ["Data", "Données"], subtitle: ["Explore & understand", "Explorer et comprendre"], title: "Flight-Radar-Analytics-Dashboard", description: ["Turning flight data into readable dashboards: collect, explore and visualize information to understand activity and trends.", "Transformer les données de vol en tableaux de bord lisibles : collecter, explorer et visualiser les informations pour comprendre l’activité et les tendances."], stack: "Data collection / Analytics / Visualization" },
  { icon: BrainCircuit, label: ["Artificial intelligence", "Intelligence artificielle"], subtitle: ["Analyze & assist", "Analyser et assister"], title: "Intelligent Quotation with Odoo 17 & Local AI", description: ["Connecting local AI with an ERP workflow, from needs analysis and cost estimation to quotation and business operations.", "Relier l’IA locale à un processus ERP, de l’analyse des besoins et de l’estimation des coûts aux devis et aux opérations métier."], stack: "Ollama / FastAPI / Odoo 17" },
  { icon: Workflow, label: ["Business applications", "Applications métier"], subtitle: ["Build & connect", "Construire et connecter"], title: "Atelier Stock — SAP CAP", description: ["Making stock operations accessible through a bilingual application: batches, FEFO stock issues, roles and audit trails with SAP CAP.", "Faciliter la gestion des stocks avec une application bilingue : lots, sorties FEFO, rôles et traçabilité avec SAP CAP."], stack: "SAP CAP / CDS / OData V4 / Node.js" }
];

export default function ExpertiseJourney() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const fr = language === "fr";
  const copy = pair => pair[fr ? 1 : 0];
  const stage = stages[active];
  const project = products.find(item => item.title === stage.title);
  return <motion.section className="expertise-journey" aria-labelledby="journey-title" initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: .5 }}>
    <div className="journey-heading"><div><span className="eyebrow">{fr ? "MON UNIVERS / IA × DATA × SAP" : "MY FIELD / AI × DATA × SAP"}</span><h2 id="journey-title">{fr ? "Des données aux usages métier." : "From data to business applications."}</h2></div><p>{fr ? "Trois facettes de mon parcours. Explorez les projets qui les illustrent." : "Three sides of my engineering journey. Explore the projects behind them."}</p></div>
    <div className="journey-workspace">
      <div className="journey-path" role="group" aria-label={fr ? "Explorer mes domaines" : "Explore my areas"}>
        {stages.map((item, index) => { const Icon = item.icon; return <button type="button" key={item.title} className={`journey-node ${active === index ? "is-active" : ""}`} aria-pressed={active === index} aria-controls="journey-project" onClick={() => setActive(index)}><span className="journey-node-top"><Icon size={23}/><span>0{index + 1}</span></span><strong>{copy(item.label)}</strong><span>{copy(item.subtitle)}</span><ArrowRight className="journey-node-arrow" size={18}/></button>; })}
      </div>
      <div id="journey-project" className="journey-project" aria-live="polite" aria-atomic="true">
        <motion.div className="journey-project-copy" key={active} initial={reduced ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}><span className="journey-proof">{fr ? "EN PRATIQUE / PROJET RÉALISÉ" : "IN PRACTICE / PROJECT WORK"}</span><h3>{stage.title}</h3><p>{copy(stage.description)}</p><span className="journey-stack">{stage.stack}</span>{project && <Link to={project.detailsPath || "/projects"} className="journey-case-link">{fr ? "Découvrir le projet" : "Explore the project"}<ArrowUpRight size={17}/></Link>}</motion.div>
        {project && <Link to={project.detailsPath || "/projects"} className="journey-preview" aria-label={`${fr ? "Découvrir" : "Explore"} ${stage.title}`}><img src={project.thumbnail} alt={stage.title} width="600" height="400" loading="lazy" decoding="async"/><span>{fr ? "Voir l’étude de projet" : "View project case study"}<ArrowUpRight size={15}/></span></Link>}
      </div>
      <div className="journey-foundation"><span>SAP BTP · SAP Business AI Platform · Joule Studio</span><span>{fr ? "Parcours et attestations dans mon profil ci-dessous" : "Learning journey & achievements in my profile below"}</span></div>
    </div>
  </motion.section>;
}

