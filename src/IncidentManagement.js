import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Text, useLanguage } from "./i18n/Language";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import { products } from "./profileData/projects";
import incidents from "./images/sap-incident-management/incidents-list.webp";
import workzone from "./images/sap-incident-management/work-zone.webp";
import pipeline from "./images/sap-incident-management/cicd-success.webp";
import mission from "./images/sap-incident-management/discovery-center-completed.webp";

const evidence = [
  { image: incidents, width: 1516, height: 404, title: "Incident list", alt: "Customer incident list in SAP Fiori Elements", caption: "Search, editing state, urgency filters and incident records in the Fiori Elements application.", wide: true },
  { image: workzone, width: 615, height: 266, title: "SAP Build Work Zone", alt: "Incident Management tile in SAP Build Work Zone", caption: "The application is accessible through its tile in SAP Build Work Zone." },
  { image: pipeline, width: 429, height: 645, title: "CI/CD execution", alt: "SAP CI/CD pipeline showing Build, Additional Unit Tests and Release in Success", caption: "Build, Additional Unit Tests and Release show Success. Malware Scan, Acceptance and Compliance are marked Skipped." },
  { image: mission, width: 1532, height: 156, title: "Completed learning mission", alt: "SAP Discovery Center mission with progress 100 percent and phase Completed", caption: "SAP Discovery Center: mission Completed, progress 100%. This is learning-path completion, not an SAP certification.", wide: true },
];
const features = [
  "CDS model for incidents, customers, statuses, urgencies and conversation messages; OData V4 services for support and administration.",
  "SAP Fiori Elements list and object pages, including draft handling, customer associations and conversation data.",
  "Custom CAP logic assigns high urgency when the title contains urgent and prevents updates to a closed incident.",
  "XSUAA authentication in production, with separate support and admin roles protecting the ProcessorService and AdminService.",
];
export default function IncidentManagement() {
  const { t } = useLanguage();
  const project = products.find(item => item.title === "SAP Incident Management");
  return <div className="portfolio-site"><PortfolioNav/><main id="main-content" className="project-detail-page" tabIndex={-1}>
    <Link to="/projects" className="project-back"><ArrowLeft size={16}/><Text value="Back to projects"/></Link>
    <header className="project-detail-header">
      <span className="eyebrow"><Text value="GUIDED PRACTICE / NOVEMBER 2026"/></span>
      <h1>SAP Incident Management</h1>
      <p className="project-context"><Text value="SAP CLD200 guided project · SAP BTP Trial environment · November 2026"/></p>
      <p><Text value="A practical full-stack learning project to follow customer support incidents from creation to resolution, connecting a Fiori interface to CAP services and cloud persistence."/></p>
      <ul className="project-tags" aria-label={t("Technologies")}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <a href={project.link} className="primary-button" target="_blank" rel="noopener noreferrer"><Text value="View GitHub repository"/><ArrowUpRight size={17}/></a>
    </header>
    <section className="project-detail-section" aria-labelledby="incident-goal"><span className="eyebrow">01 / <Text value="BUSINESS GOAL"/></span><h2 id="incident-goal"><Text value="A structured customer-support workflow"/></h2>
      <p><Text value="Centralize incident records, associate them with customers, track status and urgency, and keep the conversation alongside the incident. This is a guided training scenario, not a client engagement."/></p>
      <ul className="project-feature-list">{features.map(feature => <li key={feature}><Text value={feature}/></li>)}</ul>
    </section>
    <section className="project-detail-section" aria-labelledby="incident-architecture"><span className="eyebrow">02 / <Text value="ARCHITECTURE"/></span><h2 id="incident-architecture"><Text value="From the SAP portal to the data model"/></h2>
      <ol className="architecture-flow" aria-label={t("Application architecture")}>{["SAP Build Work Zone", "SAP Fiori Elements", "OData V4 · CAP / Node.js", "SAP HANA Cloud"].map(layer => <li key={layer}>{layer}</li>)}</ol>
      <p><Text value="XSUAA protects access. The MTA package deploys the CAP service, HANA database artifacts and HTML5 application to SAP BTP Cloud Foundry; Work Zone exposes the application through a portal tile."/></p>
    </section>
    <section className="project-detail-section" aria-labelledby="incident-delivery"><span className="eyebrow">03 / <Text value="DELIVERY & LEARNING"/></span><h2 id="incident-delivery"><Text value="A guided path through deployment and delivery"/></h2>
      <ul className="project-feature-list"><li><Text value="Built and deployed the MTA application with SAP HANA Cloud persistence and SAP Build Work Zone integration."/></li>
        <li><Text value="Validated a SAP Continuous Integration and Delivery execution with build, automated unit tests and release deployment; configured its automatic trigger through a GitHub webhook."/></li>
        <li><Text value="Practised CDS modeling, OData V4 and draft behavior, role-based access, CAP business logic, MTA packaging and the cloud delivery lifecycle."/></li>
        <li><Text value="Completed the Discovery Center mission Develop a Full-Stack CAP Application Following the SAP BTP Developer’s Guide (100%)."/></li></ul>
      <p className="project-scope-note"><Text value="Scope: SAP CLD200 guided practice in a Trial environment. Kyma was not implemented. Mission completion is not an SAP certification."/></p>
    </section>
    <section className="project-detail-section" aria-labelledby="incident-evidence"><span className="eyebrow">04 / <Text value="PROJECT SCREENSHOTS"/></span><h2 id="incident-evidence"><Text value="Real application and delivery screenshots"/></h2>
      <p><Text value="Open a screenshot to view it at full resolution. Personal account details have been removed from these supplied captures."/></p>
      <div className="project-evidence-grid">{evidence.map(item => <figure key={item.title} className={item.wide ? "evidence-wide" : ""}>
        <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`${t("Open full-resolution image")}: ${t(item.title)}`}><img src={item.image} alt={t(item.alt)} width={item.width} height={item.height} loading="lazy" decoding="async"/></a>
        <figcaption><h3><Text value={item.title}/></h3><p><Text value={item.caption}/></p><a href={item.image} target="_blank" rel="noopener noreferrer"><Text value="Open full-resolution image"/><ArrowUpRight size={14}/></a></figcaption>
      </figure>)}</div>
    </section>
  </main><PortfolioFooter/></div>;
}
