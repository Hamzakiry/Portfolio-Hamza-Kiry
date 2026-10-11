import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import portrait from "../../images/hamza-kiry-studio.webp";

export const HeroParallax = ({ products, children }) => {
  const ref = React.useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const forward = useSpring(useTransform(scrollYProgress, [0, 1], [-45, 65]), { stiffness: 90, damping: 30 });
  const reverse = useSpring(useTransform(scrollYProgress, [0, 1], [45, -65]), { stiffness: 90, damping: 30 });
  return <section ref={ref} className="hero-section">
    <Header/>
    {children}
    <div className="showcase-heading"><span className="eyebrow">A GLIMPSE OF MY WORK</span><Link to="/projects">Explore all projects <ArrowUpRight size={16}/></Link></div>
    <div className="project-showcase">
      {[products.slice(0, 5), products.slice(5, 10)].map((row, index) => <motion.div key={index} className="showcase-row" style={{ x: reduced ? 0 : index === 0 ? forward : reverse }}>
        {row.map(product => <ProductCard key={product.title} product={product}/>)}
      </motion.div>)}
    </div>
  </section>;
};

export const Header = () => <div className="hero-intro">
  <div className="hero-copy"><span className="eyebrow"><span className="status-dot"/> ENGINEERING STUDENT / AI & BIG DATA</span>
    <h1>Hamza Kiry<span>.</span><br/><span className="hero-specialty">AI. Big Data. SAP.</span></h1>
    <p>Final-year engineering student in Artificial Intelligence and Big Data at Agadir Polytechnic School. Building AI and data solutions while developing skills in SAP BTP, SAP Business AI Platform and SAP CAP.</p>
    <div className="hero-focus" aria-label="Areas of focus"><span>Artificial Intelligence</span><span>Big Data</span><span>SAP BTP</span><span>SAP Business AI Platform</span></div>
    <div className="hero-actions"><Link to="/projects" className="primary-button">Explore my projects <ArrowUpRight size={18}/></Link><a className="secondary-button" href="mailto:hamza.kiry2@gmail.com">Let’s connect <ArrowUpRight size={18}/></a></div>
    <div className="cv-downloads"><span>DOWNLOAD MY CV</span><a href={`${process.env.PUBLIC_URL}/cv/Hamza-Kiry-CV-FR.pdf`} download="Hamza-Kiry-CV-FR.pdf" lang="fr"><Download size={16}/> CV français <span>PDF</span></a><a href={`${process.env.PUBLIC_URL}/cv/Hamza-Kiry-CV-EN.pdf`} download="Hamza-Kiry-CV-EN.pdf" lang="en"><Download size={16}/> English CV <span>PDF</span></a></div>
  </div>
  <div className="hero-profile"><img className="hero-portrait" src={portrait} width="864" height="1296" fetchpriority="high" alt="Hamza Kiry"/><div className="hero-profile-details"><p>AI & Big Data<br/><span>Final-year engineering student</span></p><span className="profile-location"><MapPin size={14}/> Agadir, Morocco</span><a href="tel:+212699507431" className="profile-phone">+212 6 99 50 74 31</a><span className="note-bottom">AVAILABLE MARCH 2027 <ArrowDown size={17}/></span></div></div>
</div>;

export const ProductCard = ({ product }) => <a href={product.link} target="_blank" rel="noopener noreferrer" className="showcase-card">
  <div className="showcase-image"><img src={product.thumbnail} width="600" height="400" loading="lazy" decoding="async" alt={product.title}/></div>
  <div className="showcase-caption"><h2>{product.title}</h2><ArrowUpRight size={18}/></div>
</a>;
