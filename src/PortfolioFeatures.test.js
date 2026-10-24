import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "./Contact";
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
function fillContact() {
  fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "recruteur@example.org" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour Hamza, une opportunité PFE." } });
}
function mockDelivery(response) { global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => response }); }
afterEach(() => { delete global.fetch; });
test("does not send before provider authorization and email activation", () => {
  global.fetch = jest.fn();
  mount(<Contact enabled={false}/>);
  expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.queryByRole("link", { name: "Open email app" })).not.toBeInTheDocument();
});
test("sends email and message in place without opening a mail client", async () => {
  mockDelivery({ success: "true", message: "Email sent successfully" });
  mount(<Contact enabled/>);
  fillContact();
  fireEvent.submit(screen.getByRole("form", { name: "Contact" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("accepted your message"));
  const [url, request] = global.fetch.mock.calls[0];
  expect(url).toBe("https://formsubmit.co/ajax/hamza.kiry2@gmail.com");
  expect(JSON.parse(request.body)).toMatchObject({ email: "recruteur@example.org", _replyto: "recruteur@example.org", message: "Bonjour Hamza, une opportunité PFE." });
  expect(screen.getByLabelText("Message")).toHaveValue("");
});
test("activation responses never claim a successful delivery and keep the draft", async () => {
  mockDelivery({ success: "true", message: "Please activate your email address" });
  mount(<Contact enabled/>);
  fillContact();
  fireEvent.submit(screen.getByRole("form", { name: "Contact" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("awaiting email activation"));
  expect(screen.getByLabelText("Message")).toHaveValue("Bonjour Hamza, une opportunité PFE.");
});
test("service rejection preserves the draft for a retry", async () => {
  mockDelivery({ success: "false", message: "Unavailable" });
  mount(<Contact enabled/>);
  fillContact();
  fireEvent.submit(screen.getByRole("form", { name: "Contact" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("could not be sent"));
  expect(screen.getByLabelText("Message")).toHaveValue("Bonjour Hamza, une opportunité PFE.");
});
test("blocks repeated clicks while sending", async () => {
  let done;
  global.fetch = jest.fn().mockReturnValue(new Promise(resolve => { done = resolve; }));
  mount(<Contact enabled/>);
  fillContact();
  const form = screen.getByRole("form", { name: "Contact" });
  fireEvent.submit(form); fireEvent.submit(form);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  done({ ok: true, json: async () => ({ success: true }) });
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("accepted your message"));
});
test("provides the ten real documents without assigning a different SAP course to missing proof", () => {
  mount(<Certifications/>);
  expect(Object.keys(documents)).toHaveLength(10);
  expect(document.querySelectorAll(".resume-certifications details")).toHaveLength(0);
  expect(documents["Exploring SAP Business AI Platform Architecture"]).toBeUndefined();
  expect(documents["Introduction to SAP Cloud Application Programming Model"]).toBeUndefined();
  expect(documents["Exploring SAP Business Technology Platform"].file).toBe("sap-business-technology-platform");
  Object.keys(documents).forEach(title => {
    expect(screen.getByAltText(title).closest("a")).toHaveAttribute("href", expect.stringMatching(/\/certificates\/[^/]+\.pdf$/));
  });
});

 test("rejects invalid email without making a delivery request", () => {
  global.fetch = jest.fn();
  mount(<Contact enabled/>);
  fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "invalid" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "A final-year internship opportunity" } });
  fireEvent.submit(screen.getByRole("form", { name: "Contact" }));
  expect(global.fetch).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent("valid email address");
});
test("shows the certifications without images before the certificate gallery", () => {
  mount(<Certifications/>);
  const notes = document.querySelector(".certificate-notes");
  const gallery = document.querySelector(".certificate-gallery");
  expect(notes.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(notes).toHaveTextContent("Exploring SAP Business AI Platform Architecture");
  expect(notes).toHaveTextContent("Introduction to SAP Cloud Application Programming Model");
});
