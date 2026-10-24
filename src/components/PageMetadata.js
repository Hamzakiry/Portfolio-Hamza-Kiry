import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/Language";

export default function PageMetadata() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  useEffect(() => {
    const base = language === "fr" ? "Hamza Kiry | Étudiant ingénieur IA & Big Data · SAP" : "Hamza Kiry | AI & Big Data Engineering Student · SAP";
    const prefix = pathname === "/projects" ? (language === "fr" ? "Projets | " : "Projects | ") : pathname === "/contact" ? "Contact | " : "";
    document.title = prefix + base;
    const description = language === "fr" ? "Portfolio de Hamza Kiry, étudiant ingénieur en IA et Big Data à Agadir, Maroc. Projets de machine learning, analyse de données, ERP et SAP BTP." : "Hamza Kiry, final-year AI & Big Data engineering student in Agadir, Morocco. Explore machine learning, data analytics, ERP and SAP BTP projects.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "fr" ? "fr_FR" : "en_US");
  }, [language, pathname]);
  return null;
}
