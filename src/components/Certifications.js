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
  return <article className="resume-card resume-certifications">
    <h3><Award size={20}/> Certifications</h3>
    <ul className="certificate-list">{sapAchievements.map(item => <li key={item.title}>
      <h4>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={13}/></a> : item.title}</h4>
      <p className={item.pending ? "certification-pending" : "certification-earned"}>{item.pending ? <Clock3 size={13}/> : <CheckCircle2 size={13}/>} SAP · {item.status}</p>
    </li>)}</ul>
    <details className="other-certifications"><summary>Other certifications ({otherAchievements.length})</summary><ul className="certificate-list">{otherAchievements.map(([title,issuer,date]) => <li key={title}><h4>{title}</h4><p>{issuer} · {date}</p></li>)}</ul></details>
  </article>;
}
