import { Text, useLanguage } from "../../i18n/Language";
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
    <div className="showcase-heading"><span className="eyebrow"><Text value={"A GLIMPSE OF MY WORK"}/></span><Link to="/projects"><Text value={"Explore all projects "}/><ArrowUpRight size={16}/></Link></div>
    <div className="project-showcase">
      {[products.slice(0, 5), products.slice(5, 10)].map((row, index) => <motion.div key={index} className="showcase-row" style={{ x: reduced ? 0 : index === 0 ? forward : reverse }}>
        {row.map(product => <ProductCard key={product.title} product={product}/>)}
      </motion.div>)}
    </div>
  </section>;
};

export const Header = () => {
  const { t } = useLanguage();
  return <div className="hero-intro">
  <div className="hero-copy"><span className="eyebrow"><span className="status-dot"/><Text value={" ENGINEERING STUDENT / AI & BIG DATA"}/></span>
    <h1><Text value={"Hamza Kiry"}/><span><Text value={"."}/></span><br/><span className="hero-specialty"><Text value={"AI. Big Data. SAP."}/></span></h1>
    <p><Text value={"Final-year AI & Big Data engineering student at Agadir Polytechnic School, Morocco. Developing AI-powered applications and data solutions while building expertise in SAP BTP, and SAP Business AI Platform."}/></p>
    <div className="hero-focus" aria-label={t("Areas of focus")}><span><Text value={"Artificial Intelligence"}/></span><span><Text value={"Big Data"}/></span><span><Text value={"SAP BTP"}/></span><span><Text value={"SAP Business AI Platform"}/></span></div>
    <div className="hero-actions"><Link to="/projects" className="primary-button"><Text value={"Explore my projects "}/><ArrowUpRight size={18}/></Link><a className="secondary-button" href="https://www.linkedin.com/in/hamza-kiry-750270349/" target="_blank" rel="noopener noreferrer"><Text value={"Let’s connect "}/><ArrowUpRight size={18}/></a></div>
    <div className="cv-downloads"><span><Text value={"DOWNLOAD MY CV"}/></span><a href={`${process.env.PUBLIC_URL}/cv/Hamza-Kiry-CV-FR.pdf`} download="Hamza-Kiry-CV-FR.pdf" lang="fr"><Download size={16}/><Text value={" CV français "}/><span><Text value={"PDF"}/></span></a><a href={`${process.env.PUBLIC_URL}/cv/Hamza-Kiry-CV-EN.pdf`} download="Hamza-Kiry-CV-EN.pdf" lang="en"><Download size={16}/><Text value={" English CV "}/><span><Text value={"PDF"}/></span></a></div>
  </div>
  <div className="hero-profile"><div className="hero-portrait-frame"><img className="hero-portrait" src={portrait} width="864" height="1296" fetchpriority="high" alt="Hamza Kiry"/></div><div className="hero-profile-details"><p><Text value={"AI & Big Data"}/><br/><span><Text value={"Final-year engineering student"}/></span></p><span className="profile-location"><MapPin size={14}/><Text value={" Agadir, Morocco"}/></span><a href="tel:+212699507431" className="profile-phone"><Text value={"+212 6 99 50 74 31"}/></a><span className="note-bottom"><Text value={"AVAILABLE MARCH 2027 "}/><ArrowDown size={17}/></span></div></div>
</div>;
};

export const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  return <a href={product.link} target="_blank" rel="noopener noreferrer" className="showcase-card">
  <div className="showcase-image"><img src={product.thumbnail} width="600" height="400" loading="lazy" decoding="async" alt={t(product.title)}/></div>
  <div className="showcase-caption"><h2><Text value={product.title}/></h2><ArrowUpRight size={18}/></div>
</a>;
};
