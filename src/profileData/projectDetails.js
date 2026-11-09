// Case-study summaries based on the linked public repositories.
export const projectDetails = {
  "Intelligent Quotation with Odoo 17 & Local AI": {
    "slug": "intelligent-quotation-odoo",
    "context": "ASSISTANT ENGINEER INTERNSHIP / ERP & AI",
    "goal": "Connect customer needs to an assisted quotation workflow in Odoo, from CRM to manufacturing, delivery and invoicing.",
    "features": [
      "Analyze a free-text brief, classify the project and extract quantities, dimensions and materials.",
      "Suggest materials, retrieve similar projects and estimate costs using history or fallback business rules.",
      "Connect a custom Odoo module to a FastAPI service, Ollama and ChromaDB in Docker."
    ],
    "flow": [
      "Odoo 17 / CRM",
      "FastAPI / Python",
      "Ollama / ChromaDB",
      "PostgreSQL / Docker"
    ],
    "learning": "Explore ERP integration, API boundaries, local AI and containerized services within an operational workflow.",
    "scope": "The public repository uses synthetic demonstration data. AI estimates require human validation; private customer records are excluded."
  },
  "Python Invaders Game": {
    "slug": "python-invaders",
    "context": "GAME DEVELOPMENT / PYTHON",
    "goal": "Build an interactive Space Invaders game around a continuous gameplay loop.",
    "features": [
      "Handle player input and update the game state.",
      "Render game graphics and integrate audio using Pygame."
    ],
    "flow": [
      "Player input",
      "Python / game loop",
      "Pygame",
      "Graphics / audio"
    ],
    "learning": "Practise event handling, state updates and the separation of game logic from rendering.",
    "scope": "A learning game project using Pygame; no commercial release or performance benchmark is claimed.",
    "technologies": [
      "Python",
      "Pygame"
    ]
  },
  "Ecommerce": {
    "slug": "ecommerce",
    "context": "WEB APPLICATION / PHP",
    "goal": "Bring customer shopping and product administration into one web application.",
    "features": [
      "Provide registration, login, profile updates and order history.",
      "Manage products, categories and customers through an administration panel.",
      "Route requests through index.php, with documented input sanitisation and CSRF protection."
    ],
    "flow": [
      "Browser",
      "PHP / index.php routes",
      "Customer / admin workflows",
      "Application data"
    ],
    "learning": "Explore server-side routing, forms, customer accounts and administration workflows.",
    "scope": "Features are described in the repository. This presentation does not certify production security or live email delivery.",
    "technologies": [
      "PHP",
      "Chart.js"
    ]
  },
  "Flight-Radar-Analytics-Dashboard": {
    "slug": "flight-radar-analytics",
    "context": "DATA ANALYTICS / AVIATION",
    "goal": "Turn flight data into an interactive view of airline activity and traffic patterns.",
    "features": [
      "Collect flight data through the FlightRadar24 API wrapper.",
      "Analyze active flights, airlines, airports and average aircraft speeds.",
      "Present statistics with Streamlit and interactive Plotly charts."
    ],
    "flow": [
      "FlightRadarAPI",
      "Python / Pandas",
      "Analysis",
      "Streamlit / Plotly"
    ],
    "learning": "Connect API collection, tabular processing and dashboard design in a data analytics workflow.",
    "scope": "Educational project using an unofficial API wrapper. Available data depends on the upstream service.",
    "technologies": [
      "Python",
      "FlightRadarAPI",
      "Pandas",
      "Streamlit",
      "Plotly"
    ]
  },
  "Sneaks": {
    "slug": "sneaks",
    "context": "MOBILE UI / FLUTTER",
    "goal": "Explore a sneaker-focused mobile interface built with Flutter.",
    "features": [
      "Organize sneaker data, models, images and reusable interface components.",
      "Use custom navigation, typography and animations in a Flutter application."
    ],
    "flow": [
      "Local sneaker data",
      "Dart models",
      "Flutter widgets",
      "Navigation / animations"
    ],
    "learning": "Practise widget composition, visual consistency and mobile navigation.",
    "scope": "A UI learning project with upstream tutorial credits retained in the repository. No payment service or production backend is claimed.",
    "technologies": [
      "Flutter",
      "Dart"
    ]
  },
  "Face Recognition Kotlin": {
    "slug": "face-recognition-kotlin",
    "context": "ANDROID / COMPUTER VISION",
    "goal": "Explore face recognition and liveness detection in a native Android application.",
    "features": [
      "Integrate face recognition and liveness detection capabilities on Android.",
      "Connect Kotlin application code with the face-processing SDK described in the repository."
    ],
    "flow": [
      "Android interface",
      "Kotlin",
      "Face-processing SDK",
      "Recognition / liveness"
    ],
    "learning": "Understand mobile SDK integration and the distinction between face detection, recognition and liveness.",
    "scope": "SDK integration project. Accuracy, latency and compliance claims in upstream documentation are not independently validated here.",
    "technologies": [
      "Kotlin",
      "Android"
    ]
  },
  "Al Karama": {
    "slug": "al-karama",
    "context": "SCHOOL WEBSITE / TIZNIT",
    "goal": "Present the Al Karama nursery and primary school in Tiznit through an accessible web presence.",
    "features": [
      "Organize school information into home, about, classes, gallery and contact pages.",
      "Use responsive navigation, school imagery and a registration entry point."
    ],
    "flow": [
      "HTML pages",
      "Bootstrap / CSS",
      "JavaScript interactions",
      "School information"
    ],
    "learning": "Practise multi-page site structure, responsive layouts and information hierarchy.",
    "scope": "A school presentation site. Online registration processing and contact-message delivery have not been verified for this case study.",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap"
    ]
  },
  "Hosmony RSE Atlas": {
    "slug": "hosmony-rse-atlas",
    "context": "WEB MAPPING / SUSTAINABILITY",
    "goal": "Centralize sustainability events and key CSR actors in Morocco in a searchable map-based directory.",
    "features": [
      "Search and filter entries by type, region, theme and sector.",
      "Display entries on a Leaflet map and add records stored locally in the browser.",
      "Export filtered results to CSV and mark entries as verified."
    ],
    "flow": [
      "JSON seed / localStorage",
      "React / TypeScript",
      "Search / filters",
      "Leaflet map / CSV"
    ],
    "learning": "Connect geographic visualization, structured filters and browser-side persistence.",
    "scope": "User-added records remain in local browser storage; this is not a shared multi-user database.",
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Leaflet",
      "Tailwind CSS"
    ]
  },
  "COVID-19 Global Dashboard": {
    "slug": "covid-19-dashboard",
    "context": "DATA VISUALIZATION / PUBLIC DATA",
    "goal": "Make global COVID-19 trends easier to explore through cleaned datasets and interactive visualizations.",
    "features": [
      "Clean and preprocess country and worldwide datasets.",
      "Filter by country and explore time series through a Streamlit dashboard.",
      "Use Plotly charts to compare trends interactively."
    ],
    "flow": [
      "CSV datasets",
      "Python / Pandas",
      "Preprocessing",
      "Streamlit / Plotly"
    ],
    "learning": "Practise data quality checks, time-series exploration and interactive analytics.",
    "scope": "A historical data exploration project, not a live public-health reporting service or medical advice.",
    "technologies": [
      "Python",
      "Pandas",
      "NumPy",
      "Streamlit",
      "Plotly"
    ]
  },
  "House Price Prediction using Machine Learning": {
    "slug": "house-price-prediction",
    "context": "MACHINE LEARNING / REGRESSION",
    "goal": "Estimate house prices from property features and compare regression approaches.",
    "features": [
      "Clean housing data, explore variables and select features.",
      "Train and compare Linear, Ridge and Lasso regression models.",
      "Evaluate predictions with R², MSE and RMSE and visualize results."
    ],
    "flow": [
      "Housing dataset",
      "Pandas / preprocessing",
      "scikit-learn / regression",
      "Evaluation / Matplotlib"
    ],
    "learning": "Understand the full regression workflow and compare models using explicit evaluation metrics.",
    "scope": "A learning notebook project. No unverified accuracy score or production property valuation is presented.",
    "technologies": [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Matplotlib"
    ]
  }
};
