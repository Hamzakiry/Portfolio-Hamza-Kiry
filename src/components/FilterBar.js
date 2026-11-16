import { useLanguage } from "../i18n/Language";
const french = { All: "Tous", AI: "IA", Development: "Développement", Business: "Entrepreneuriat", "Web & ERP": "Web & ERP", Other: "Autres" };
export default function FilterBar({ options, active, onChange }) {
  const { language } = useLanguage();
  return <div className="filter-bar" role="group" aria-label={language === "fr" ? "Filtrer par domaine" : "Filter by area"}>{options.map(option => <button key={option} type="button" aria-pressed={active === option} onClick={() => onChange(option)}>{language === "fr" ? french[option] || option : option}</button>)}</div>;
}
