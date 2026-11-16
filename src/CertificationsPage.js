import { useLanguage } from "./i18n/Language";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import Certifications from "./components/Certifications";
export default function CertificationsPage() {
 const { language } = useLanguage(); const fr = language === "fr";
 return <div className="portfolio-site"><PortfolioNav/><main id="main-content" tabIndex={-1} className="projects-page certifications-page"><div className="projects-heading"><span className="eyebrow">{fr ? "FORMATION CONTINUE / JUSTIFICATIFS" : "CONTINUOUS LEARNING / CREDENTIALS"}</span><h1>{fr ? "Apprendre." : "Learning."}<br/><span className="accent">{fr ? "Mettre en pratique." : "Putting it into practice."}</span></h1><p>{fr ? "Mes certifications et attestations de formation, avec leurs documents et badges officiels disponibles." : "My certifications and course achievements, with available original documents and official badges."}</p></div><Certifications filterable/></main><PortfolioFooter/></div>;
}
