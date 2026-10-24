import Contact from "./Contact";
import PageMetadata from "./components/PageMetadata";
import { LanguageProvider } from "./i18n/Language";
import { useEffect, useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";import "./App.css";
import Home from "./Home";
import "./portfolio.css";
import Projects from "./Projects";
import CardList from "./components/CardList";
import CardModal from "./components/CardModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    const watchCards = () => document.querySelectorAll(".about-card, .project-card").forEach(card => {
      if (!card.classList.contains("revealed")) {
        card.classList.add("reveal-card");
        observer.observe(card);
      }
    });
    watchCards();
    const changes = new MutationObserver(watchCards);
    changes.observe(document.getElementById("root"), { childList: true, subtree: true });
    return () => { observer.disconnect(); changes.disconnect(); };
  }, []);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const importAll = (context) => context.keys().map(context);
    let cardData = importAll(
      require.context("./profileData", false, /\.json$/)
    );

    cardData = cardData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    setCards(cardData);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    filterCards();
    // eslint-disable-next-line
  }, [cards, searchTerm]);

  const filterCards = () => {
    let filteredData = cards;

    if (searchTerm) {
      filteredData = filteredData.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCards(filteredData);
  };

  return (
    <LanguageProvider><Router>
      <PageMetadata/>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/portfolios"
            element={
              <>
                <Navbar
                  searchTerm={searchTerm}
                  handleSearchChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
                <CardList
                  cards={filteredCards}
                  onCardClick={(card) => handleCardClick(card)}
                />
                <CardModal card={selectedCard} onClose={handleCloseModal} />
                <ScrollToTopButton />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router></LanguageProvider>
  );
};

export default App;
