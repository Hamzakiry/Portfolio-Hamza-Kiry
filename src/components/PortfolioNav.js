import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import portrait from "../images/hamza-kiry.webp";

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    if (location.state?.section) {
      document.getElementById(location.state.section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  function section(id) {
    setOpen(false);
    if (document.getElementById(id)) document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    else navigate("/", { state: { section: id } });
  }
  return <header className="portfolio-nav">
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); const main = document.getElementById("main-content"); main?.scrollIntoView(); main?.focus(); }}>Skip to content</a>
    <div className="nav-inner">
      <Link to="/" className="brand"><img className="brand-portrait" src={portrait} width="43" height="43" alt=""/><span>Hamza Kiry</span></Link>
      <nav id="main-navigation" aria-label="Main navigation" className={`nav-links ${open ? "is-open" : ""}`}>
        <Link to="/" aria-current={location.pathname === "/" ? "page" : undefined}>Home</Link>
        <Link to="/projects" aria-current={location.pathname === "/projects" ? "page" : undefined}>Projects</Link>
        <button onClick={() => section("about")}>About</button>
        <button onClick={() => section("contact")}>Contact <ArrowUpRight size={14}/></button>
      </nav>
      <div className="nav-actions"><a href="https://github.com/hamzakiry" target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub profile"><Github size={20}/></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
    </div>
  </header>;
}
