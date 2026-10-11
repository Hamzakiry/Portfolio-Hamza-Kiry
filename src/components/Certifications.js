import { Award, ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";

const sapAchievements = [
  { title: "Exploring SAP Business AI Platform Architecture", status: "Recently earned", link: "https://learning.sap.com/courses/exploring-sap-business-ai-platform-architecture" },
  { title: "Introduction to SAP Cloud Application Programming Model", status: "Recently earned", link: "https://learning.sap.com/courses/introduction-to-sap-cloud-application-programming-model" },
  { title: "Introducing SAP Business AI Platform", status: "August 2026" },
  { title: "SAP Certified — Positioning SAP Business AI Platform", status: "In progress", pending: true },
];
const otherAchievements = [
  ["Convolutional Neural Networks", "DeepLearning.AI", "June 2026"],
  ["Basics of Entrepreneurship: Thinking and Doing", "ESSEC", "May 2026"],
  ["Advanced Java", "LearnKartS", "May 2026"],
  ["Introduction to Big Data with Spark and Hadoop", "IBM", "May 2026"],
  ["Machine Learning with PySpark: Customer Churn Analysis", "Coursera", "January 2026"],
  ["AI For Everyone", "DeepLearning.AI", "January 2026"],
  ["Flutter and Dart: Developing iOS, Android, and Mobile Apps", "IBM", "January 2026"],
];

export default function Certifications() {
  return <section className="certifications-section" aria-labelledby="certifications-heading">
    <span className="eyebrow">CONTINUOUS LEARNING / CERTIFICATIONS</span>
    <div className="certifications-heading"><h2 id="certifications-heading">Building knowledge.<br/><span className="accent">Expanding possibilities.</span></h2><p>Certifications and learning achievements in SAP, artificial intelligence and data engineering.</p></div>
    <div className="certification-grid">{sapAchievements.map(item => <article className="certification-card" key={item.title}>
      <div className="certification-meta"><span className="certification-issuer"><Award size={17}/> SAP</span><span className={item.pending ? "certification-pending" : "certification-earned"}>{item.pending ? <Clock3 size={13}/> : <CheckCircle2 size={13}/>}{item.status}</span></div>
      <h3>{item.title}</h3>
      {item.link && <a href={item.link} target="_blank" rel="noreferrer" aria-label={`Course details: ${item.title}`}>Course details <ArrowUpRight size={15}/></a>}
    </article>)}</div>
    <details className="other-certifications"><summary>Other certifications <span>{otherAchievements.length} achievements · AI, Big Data & software engineering</span></summary><ul>{otherAchievements.map(([title,issuer,date]) => <li key={title}><Award size={18}/><div><h3>{title}</h3><p>{issuer} · {date}</p></div><CheckCircle2 size={16}/></li>)}</ul></details>
  </section>;
}
