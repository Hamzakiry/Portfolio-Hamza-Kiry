import { Text } from "../i18n/Language";
import Certifications from "./Certifications";
import { Briefcase, GraduationCap, Code2, Languages } from "lucide-react";

const skills = [
  ["SAP & enterprise AI", "SAP Business AI Platform architecture · SAP BTP fundamentals · SAP CAP introduction"],
  ["AI & Big Data", "Pandas, NumPy, TensorFlow, NLP, RAG, Spark, Hadoop"],
  ["Languages", "Python, C/C++, Java, JavaScript, PHP, Dart"],
  ["Web & ERP", "Odoo 17, FastAPI, OWL, Chart.js, HTML/CSS"],
  ["Tools", "Git, GitHub, Docker, Linux, PostgreSQL, Postman"],
];

export default function ResumeOverview() {
  return <section className="resume-section" aria-labelledby="resume-heading">
    <div className="resume-heading"><span className="eyebrow"><Text value={"PROFILE / AT A GLANCE"}/></span><h2 id="resume-heading"><Text value={"AI, Big Data & intelligent enterprise."}/></h2><p><Text value={"I am a final-year engineering student in Artificial Intelligence and Big Data at Agadir Polytechnic School, Morocco. Through academic projects and internships, I have gained hands-on experience in machine learning, data analytics, and AI integration within an ERP environment. I am currently deepening my knowledge of SAP BTP, SAP Business AI Platform, and SAP Cloud Application Programming Model (CAP), with the goal of connecting business needs with practical AI and enterprise software solutions."}/></p><div className="profile-facts"><span><Text value={"Agadir, Morocco"}/></span><span><Text value={"Seeking a 6-month final-year internship in France"}/></span><span><Text value={"Available March 2027"}/></span></div></div>
    <div className="resume-grid">
      <article className="resume-card"><h3><Briefcase size={20}/><Text value={" Experience"}/></h3><ol className="resume-timeline">
        <li><h4><Text value={"MEDIA TELECOM"}/></h4><span><Text value={"Engineering Assistant Intern · Agadir"}/></span><p><Text value={"ERP and AI solution addressing business needs, using Odoo 17 and decision support."}/></p></li>
        <li><h4><Text value={"Al Karama Private School"}/></h4><span><Text value={"Web Development Intern"}/></span><p><Text value={"School management website covering students, classes and absence tracking."}/></p></li>
        <li><h4><Text value={"Nador El Aroui Airport"}/></h4><span><Text value={"Mobile Development Intern · Flutter / Dart"}/></span><p><Text value={"Real-time flight tracking, aircraft visualization and flight information."}/></p></li>
      </ol></article>
      <article className="resume-card"><h3><GraduationCap size={20}/><Text value={" Education"}/></h3><ol className="resume-timeline">
        <li><span className="resume-date"><Text value={"2024 — 2027"}/></span><h4><Text value={"Agadir Polytechnic School"}/></h4><p><Text value={"Engineering Cycle · Computer Engineering, AI & Big Data"}/></p></li>
        <li><span className="resume-date"><Text value={"2022 — 2024"}/></span><h4><Text value={"Mprepas · Marrakech"}/></h4><p><Text value={"Preparatory Classes for Engineering Schools · MP"}/></p></li>
        <li><span className="resume-date"><Text value={"2021 — 2022"}/></span><h4><Text value={"Akenssous · Essaouira"}/></h4><p><Text value={"Baccalaureate in Physical Sciences · Mention Bien"}/></p></li>
      </ol></article>
      <article className="resume-card resume-skills"><h3><Code2 size={20}/><Text value={" Technical toolkit"}/></h3><div className="skill-groups">{skills.map(([label, value]) => <div key={label}><h4><Text value={label}/></h4><p><Text value={value}/></p></div>)}</div><div className="resume-languages"><Languages size={18}/><span><Text value={"French · DELF B2"}/></span><span><Text value={"English · B2 ALTISSIA"}/></span></div><p className="soft-skills"><Text value={"Rigor · Autonomy · Analytical thinking · Teamwork"}/></p></article>
      <Certifications/>
    </div>
  </section>;
}
