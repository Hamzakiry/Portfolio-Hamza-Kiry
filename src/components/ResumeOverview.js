import { Briefcase, GraduationCap, Code2, Languages } from "lucide-react";

const skills = [
  ["SAP & enterprise AI", "SAP Business AI Platform / SAP BTP fundamentals · SAP certification in progress"],
  ["AI & Big Data", "Pandas, NumPy, TensorFlow, NLP, RAG, Spark, Hadoop"],
  ["Languages", "Python, C/C++, Java, JavaScript, PHP, Dart"],
  ["Web & ERP", "Odoo 17, FastAPI, OWL, Chart.js, HTML/CSS"],
  ["Tools", "Git, GitHub, Docker, Linux, PostgreSQL, Postman"],
];

export default function ResumeOverview() {
  return <section className="resume-section" aria-labelledby="resume-heading">
    <div className="resume-heading"><span className="eyebrow">PROFILE / AT A GLANCE</span><h2 id="resume-heading">AI, Big Data & intelligent enterprise.</h2><p>Final-year engineering student in Artificial Intelligence and Big Data at Agadir Polytechnic School. My focus combines machine learning, data analytics and enterprise AI, with foundations in SAP BTP and SAP Business AI Platform. Software engineering supports the reliable, explainable and deployable solutions I build.</p><div className="profile-facts"><span>Agadir, Morocco</span><span>Seeking a 6-month final-year internship in France</span><span>Available March 2027</span></div></div>
    <div className="resume-grid">
      <article className="resume-card"><h3><Briefcase size={20}/> Experience</h3><ol className="resume-timeline">
        <li><h4>MEDIA TELECOM</h4><span>Engineering Assistant Intern · Agadir</span><p>ERP and AI solution addressing business needs, using Odoo 17 and decision support.</p></li>
        <li><h4>Al Karama Private School</h4><span>Web Development Intern</span><p>School management website covering students, classes and absence tracking.</p></li>
        <li><h4>Nador El Aroui Airport</h4><span>Mobile Development Intern · Flutter / Dart</span><p>Real-time flight tracking, aircraft visualization and flight information.</p></li>
      </ol></article>
      <article className="resume-card"><h3><GraduationCap size={20}/> Education</h3><ol className="resume-timeline">
        <li><span className="resume-date">2024 — 2027</span><h4>Agadir Polytechnic School</h4><p>Engineering Cycle · Computer Engineering, AI & Big Data</p></li>
        <li><span className="resume-date">2022 — 2024</span><h4>Mprepas · Marrakech</h4><p>Preparatory Classes for Engineering Schools · MP</p></li>
        <li><span className="resume-date">2021 — 2022</span><h4>Akenssous · Essaouira</h4><p>Baccalaureate in Physical Sciences · Mention Bien</p></li>
      </ol></article>
      <article className="resume-card resume-skills"><h3><Code2 size={20}/> Technical toolkit</h3><div className="skill-groups">{skills.map(([label, value]) => <div key={label}><h4>{label}</h4><p>{value}</p></div>)}</div><div className="resume-languages"><Languages size={18}/><span>French · DELF B2</span><span>English · B2 ALTISSIA</span></div><p className="soft-skills">Rigor · Autonomy · Analytical thinking · Teamwork</p></article>
    </div>
  </section>;
}
