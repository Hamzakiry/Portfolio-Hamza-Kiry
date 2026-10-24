import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact, { messageEmailLink } from "./Contact";
import Projects from "./Projects";
import { LanguageProvider } from "./i18n/Language";
import Certifications from "./components/Certifications";
import documents from "./data/certificateDocuments.json";

beforeEach(() => { window.scrollTo = jest.fn(); localStorage.clear(); });
const mount = ui => render(<LanguageProvider><MemoryRouter>{ui}</MemoryRouter></LanguageProvider>);
test("switches project copy and navigation without changing repository links", () => {
  mount(<Projects/>);
  const original = screen.getByRole("heading", { name: "House Price Prediction using Machine Learning" }).closest("a").href;
  fireEvent.click(screen.getByRole("button", { name: "Français" }));
  expect(screen.getAllByRole("link", { name: "Accueil" })).toHaveLength(2);
  expect(screen.getByRole("heading", { name: "Prédiction des prix immobiliers par machine learning" }).closest("a").href).toBe(original);
  expect(document.documentElement.lang).toBe("fr");
  expect(localStorage.getItem("portfolio-language")).toBe("fr");
  fireEvent.click(screen.getByRole("button", { name: "English" }));
  expect(screen.getByRole("heading", { name: "House Price Prediction using Machine Learning" })).toBeInTheDocument();
});
test("prepares actual contact details without claiming delivery", () => {
  mount(<Contact/>);
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Élodie & Co" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour !\nProjet IA ?" } });
  const url = new URL(screen.getByRole("link", { name: "Open email app" }).href);
  expect(url.pathname).toBe("hamza.kiry2@gmail.com");
  expect(url.searchParams.get("body")).toBe("Élodie & Co\n\nBonjour !\nProjet IA ?");
  expect(screen.getByText(/No message is sent automatically/)).toBeInTheDocument();
  expect(screen.getAllByRole("textbox")).toHaveLength(2);
});
test("empty contact fields do not open the email client", () => {
  mount(<Contact/>);
  fireEvent.click(screen.getByRole("link", { name: "Open email app" }));
  expect(screen.getByRole("status")).toHaveTextContent("Please enter your name and message.");
  expect(messageEmailLink(" Hamza ", " Bonjour ", "fr")).toContain("subject=Contact%20depuis%20le%20portfolio");
});
test("provides the ten real documents without assigning a different SAP course to missing proof", () => {
  mount(<Certifications/>);
  expect(Object.keys(documents)).toHaveLength(10);
  expect(documents["Exploring SAP Business AI Platform Architecture"]).toBeUndefined();
  expect(documents["Introduction to SAP Cloud Application Programming Model"]).toBeUndefined();
  expect(documents["Exploring SAP Business Technology Platform"].file).toBe("sap-business-technology-platform");
  Object.keys(documents).forEach(title => {
    expect(screen.getByAltText(title).closest("a")).toHaveAttribute("href", expect.stringMatching(/\/certificates\/[^/]+\.pdf$/));
  });
});
