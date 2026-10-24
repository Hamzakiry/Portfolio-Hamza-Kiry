import { Text } from "../i18n/Language";
import { Award, ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import documents from "../data/certificateDocuments.json";

const sapAchievements = [
  { title: "Exploring SAP Business AI Platform Architecture", status: "October 2026", link: "https://learning.sap.com/courses/exploring-sap-business-ai-platform-architecture" },
  { title: "Introduction to SAP Cloud Application Programming Model", status: "October 2026", link: "https://learning.sap.com/courses/introduction-to-sap-cloud-application-programming-model" },
  { title: "Introducing SAP Business AI Platform", status: "August 2026" },
  { title: "Exploring SAP Business Technology Platform", status: "September 2026" },
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
  ["100 Days of Code: The Complete Python Pro Bootcamp", "Udemy", "June 2026"],
];

function CertificateDocument({ title }) {
  const document = documents[title];
  if (!document) return null;
  const base = `${process.env.PUBLIC_URL}/certificates/${document.file}`;
  return <div className="certificate-document">
    <a href={`${base}.pdf`} target="_blank" rel="noopener noreferrer" className="certificate-preview">
      <img src={`${base}.webp`} alt={title} width={document.width} height={document.height} loading="lazy" decoding="async"/>
      <span><Text value="Open full-resolution certificate"/> <ArrowUpRight size={14}/></span>
    </a>
  </div>;
}

export default function Certifications() {
  const certificates = [
    ...sapAchievements.filter(item => documents[item.title]).map(item => ({ ...item, issuer: "SAP" })),
    ...otherAchievements.map(([title, issuer, status]) => ({ title, issuer, status })),
  ];
  const withoutDocument = sapAchievements.filter(item => !documents[item.title]);
  return <article className="resume-card resume-certifications">
    <h3><Award size={20}/><Text value="Certifications"/></h3>
    <ul className="certificate-list certificate-gallery">{certificates.map(item => <li key={item.title}>
      <CertificateDocument title={item.title}/>
      <h4>{item.title}</h4>
      <p>{item.issuer}<Text value=" · "/><Text value={item.status}/></p>
    </li>)}</ul>
    <ul className="certificate-list certificate-notes">{withoutDocument.map(item => <li key={item.title}>
      <h4>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={13}/></a> : item.title}</h4>
      <p className={item.pending ? "certification-pending" : "certification-earned"}>{item.pending ? <Clock3 size={13}/> : <CheckCircle2 size={13}/>}<Text value="SAP · "/><Text value={item.status}/></p>
    </li>)}</ul>
  </article>;
}
