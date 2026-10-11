import { HeroParallax } from "./components/ui/hero-parallax";
import { products } from "./profileData/projects";
import PortfolioNav from "./components/PortfolioNav";
import PortfolioFooter from "./components/PortfolioFooter";
import ResumeOverview from "./components/ResumeOverview";
import Certifications from "./components/Certifications";
import { ProjectsVisual, ContactVisual } from "./components/AboutVisuals";
import Card1 from "./images/Card_1.webp";

export default function Home() {
  return <div className="portfolio-site"><PortfolioNav/><main id="main-content" tabIndex={-1}>
    <HeroParallax products={products}><ResumeOverview/></HeroParallax>
    <Certifications/>
      {/* About / Features */}
      <div
        id="about"
        className="about-section"
      >
        <div className="about-heading"><span className="eyebrow">01 / BEHIND THE WORK</span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl xl:text-5xl xl:leading-tight">
            Building, Learning & Showcasing My Work
          </h2>
        </div>

        <div className="text-center">
          <p className="mb-8 text-base font-normal leading-7 text-gray-600 lg:max-w-md">
            I am Hamza Kiry, a final-year AI & Big Data engineering student,
            studying intelligent systems, data analytics and SAP enterprise AI.
          </p>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              ABOUT ME
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              I explore machine learning, Big Data and intelligent enterprise
              solutions, while developing my foundations in SAP BTP and SAP
              Business AI Platform.
            </p>
            <div className="v ab bb dc bf cf">
              <img loading="lazy" decoding="async" className="about-image" src={Card1} alt="About Hamza Kiry" />
            </div>
          </div>

          <div className="about-card">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              PROJECTS
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              From predictive models and analytics dashboards to ERP and AI
              integration, my projects connect data with practical business needs.
            </p>
            <div className="v ab bb dc bf cf ih wh">
              <ProjectsVisual/>
            </div>

          </div>

          <div className="about-card">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              CONTACT
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              I’m open to collaboration, freelance work, and new opportunities.
              Feel free to reach out and connect with me.
            </p>
            <div className="v ab bb dc bf cf ih wh">
              <ContactVisual/>
            </div>
          </div>
        </div>
      </div>

</main><PortfolioFooter/></div>;
}
