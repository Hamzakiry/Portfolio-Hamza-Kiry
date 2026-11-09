import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Text, useLanguage } from "./i18n/Language";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import { products } from "./profileData/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const project = products.find(item => item.details?.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const details = project?.details;
  return <div className="portfolio-site"><PortfolioNav/><main id="main-content" className="project-detail-page" tabIndex={-1}>
    <Link to="/projects" className="project-back"><ArrowLeft size={16}/><Text value="Back to projects"/></Link>
    {!details ? <header className="project-detail-header"><h1><Text value="Project not found"/></h1><p><Text value="This project is not in the portfolio."/></p></header> : <>
      <header className="project-detail-header">
        <span className="eyebrow"><Text value="PROJECT OVERVIEW"/></span>
        <h1><Text value={project.title}/></h1>
        <p className="project-context"><Text value={details.context}/></p>
        <p><Text value={project.description}/></p>
        {project.technologies?.length > 0 && <ul className="project-tags" aria-label={t("Technologies")}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
        <a href={project.link} className="primary-button" target="_blank" rel="noopener noreferrer"><Text value="View GitHub repository"/><ArrowUpRight size={17}/></a>
      </header>
      <section className="project-detail-section" aria-labelledby="project-goal">
        <span className="eyebrow">01 / <Text value="BUSINESS GOAL"/></span><h2 id="project-goal"><Text value="Project purpose"/></h2>
        <p><Text value={details.goal}/></p>
        <ul className="project-feature-list">{details.features.map(feature => <li key={feature}><Text value={feature}/></li>)}</ul>
      </section>
      <section className="project-detail-section" aria-labelledby="project-architecture">
        <span className="eyebrow">02 / <Text value="ARCHITECTURE"/></span><h2 id="project-architecture"><Text value="How the project is organized"/></h2>
        <ol className="architecture-flow" aria-label={t("Application architecture")}>{details.flow.map(layer => <li key={layer}>{layer}</li>)}</ol>
      </section>
      <section className="project-detail-section" aria-labelledby="project-learning">
        <span className="eyebrow">03 / <Text value="DELIVERY & LEARNING"/></span><h2 id="project-learning"><Text value="Technical practice and scope"/></h2>
        <p><Text value={details.learning}/></p><p className="project-scope-note"><Text value={details.scope}/></p>
      </section>
      <section className="project-detail-section" aria-labelledby="project-preview">
        <span className="eyebrow">04 / <Text value="PROJECT SCREENSHOTS"/></span><h2 id="project-preview"><Text value="Project preview"/></h2>
        <div className="project-evidence-grid"><figure className="evidence-wide">
          <a href={project.thumbnail} target="_blank" rel="noopener noreferrer" aria-label={t("Open full-resolution image")+': '+t(project.title)}><img src={project.thumbnail} alt={t(project.title)} loading="lazy" decoding="async"/></a>
          <figcaption><h3><Text value={project.title}/></h3><p><Text value="Existing portfolio visual. Open the image at full resolution."/></p><a href={project.thumbnail} target="_blank" rel="noopener noreferrer"><Text value="Open full-resolution image"/><ArrowUpRight size={14}/></a></figcaption>
        </figure></div>
      </section>
    </>}
  </main><PortfolioFooter/></div>;
}
