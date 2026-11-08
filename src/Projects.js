import { Text, useLanguage } from "./i18n/Language";
import { products } from "./profileData/projects";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";

export default function Projects() {
  const { t } = useLanguage();
  return <div className="portfolio-site"><PortfolioNav/><main id="main-content" tabIndex={-1} className="projects-page">
    <div className="projects-heading"><span className="eyebrow"><Text value="SELECTED WORK"/> / {products.length} <Text value="PROJECTS"/></span><h1><Text value={"Ideas turned into"}/><br/><span className="accent"><Text value={"real-world projects."}/></span></h1><p><Text value={"Explore my projects, their technical details and source repositories."}/></p></div>
        <div className="project-grid">
          {products.map((project) => {
            const Card = project.detailsPath ? Link : "a";
            const destination = project.detailsPath ? { to: project.detailsPath } : { href: project.link, target: "_blank", rel: "noopener noreferrer" };
            return (
            <Card
              key={project.title}
              {...destination}
              className="project-card"
            >
              <div className="project-image">
                <img
                  loading="lazy" decoding="async" src={project.thumbnail}
                  alt={t(project.title === "SAP Incident Management" ? "Customer incident list in SAP Fiori Elements" : project.title)}
                  className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="project-body"><span className="project-number">{String(products.indexOf(project) + 1).padStart(2, "0")}<Text value={" / PROJECT"}/></span>
                <h2 className="text-xl font-semibold text-white">
                  <Text value={project.title}/>
                </h2>
                {project.technologies && <ul className="project-tags" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  <Text value={project.description}/>
                </p>

                <div className="project-cta"><Text value={project.detailsPath ? "View project details" : " View repository "}/><ArrowUpRight size={17}/>
                </div>
              </div>
            </Card>
          );})}
        </div>
</main><PortfolioFooter/></div>;
}
