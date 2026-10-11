import Pro1 from "../images/Pro1.webp";
import Pro2 from "../images/Pro2.webp";
import Pro3 from "../images/Pro3.webp";
import Pro4 from "../images/Pro4.webp";
import Pro5 from "../images/Pro5.webp";
import Pro6 from "../images/Pro6.webp";
import Pro7 from "../images/Pro7.webp";
import Pro8 from "../images/Pro8.webp";
import Pro9 from "../images/Pro9.webp";
import Pro10 from "../images/Pro10.webp";

const projectData = [
  {
    title: "Intelligent Quotation with Odoo 17 & Local AI",
    link: "https://github.com/Hamzakiry/S1_Docker_Setup_et_Audit_Donnees",
    thumbnail: Pro10,
    technologies: ["Odoo 17", "FastAPI", "Docker", "PostgreSQL", "Ollama"],
    description:
      "Assistant engineer internship project covering the complete CRM workflow: AI-assisted needs analysis, cost estimation, quotation, manufacturing, delivery, and invoicing with Odoo 17, FastAPI, Docker, PostgreSQL, and Ollama.",
  },
  {
    title: "Python Invaders Game",
    link: "https://github.com/Hamzakiry/Python-Invaders-Game-main",
    thumbnail: Pro1,
    technologies: ["Python"],
    description: "A Python game project showcasing gameplay logic and interface design.",
  },
  {
    title: "Ecommerce",
    link: "https://github.com/Hamzakiry/ecommerce",
    thumbnail: Pro2,
    description: "An e-commerce application focused on online shopping features.",
  },
  {
    title: "Flight-Radar-Analytics-Dashboard",
    link: "https://github.com/Hamzakiry/Flight-Radar-Analytics-Dashboard",
    thumbnail: Pro3,
    technologies: ["FlightRadar24 API"],
    description: "Flight Radar Analytics Dashboard is a data analysis and visualization project that collects real-time flight data using the FlightRadar24 API and transforms it into meaningful insights through interactive dashboards and analytics.The goal of this project is to explore aviation data, analyze airline activity, and visualize global flight traffic patterns.This project was developed as part of a data engineering and analytics learning portfolio.",
  },
  {
    title: "Sneaks",
    link: "https://github.com/Hamzakiry/sneaks",
    thumbnail: Pro4,
    description: "A project around sneakers with modern UI presentation.",
  },
  {
    title: "Face Recognition Kotlin",
    link: "https://github.com/Hamzakiry/FaceRecognition-kotlin",
    thumbnail: Pro7,
    technologies: ["Kotlin"],
    description: "A Kotlin-based face recognition application.",
  },
  {
    title: "Al Karama",
    link: "https://github.com/Hamzakiry/al-karama",
    thumbnail: Pro8,
    description: "A project related to Al Karama with practical web features.",
  },
  {
    title: "Hosmony RSE Atlas",
    link: "https://github.com/Hamzakiry/Hosmony-RSE-Atlas",
    thumbnail: Pro9,
    description: "A project focused on Atlas and RSE-related implementation.",
  },
  {
  title: "COVID-19 Global Dashboard",
  thumbnail: Pro5,
  technologies: ["Streamlit", "Plotly"],
  description:
    "An interactive dashboard built with Streamlit and Plotly to explore global COVID-19 trends through data cleaning, preprocessing, and dynamic visualizations.",
  link: "https://github.com/Hamzakiry/covid-main",
},
{
  title: "House Price Prediction using Machine Learning",
  thumbnail: Pro6,
  technologies: ["Python", "Pandas", "scikit-learn"],
  description:
    "A machine learning project for predicting house prices using data preprocessing, exploratory data analysis, regression models, and performance evaluation.",
  link: "https://github.com/Hamzakiry/-House-Price-Prediction-using-Machine-Learning",
}
];

// Keep complete project records together when changing the gallery order.
export const products = [...projectData];
const ecommerceIndex = products.findIndex(project => project.title === "Ecommerce");
const houseIndex = products.findIndex(project => project.title === "House Price Prediction using Machine Learning");
[products[ecommerceIndex], products[houseIndex]] = [products[houseIndex], products[ecommerceIndex]];
