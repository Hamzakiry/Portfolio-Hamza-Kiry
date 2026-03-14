import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "./profileData/projects";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";

export default function Projects() {
  const [showNavbar, setShowNavbar] = useState(false);

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  const getCurrentYear = () => new Date().getFullYear();

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setShowNavbar(false);
    }
  }

  function goToHome() {
    window.location.href = "/Portfolio-Hamza-Kiry/#/";
  }

  const footerLinks = [
    {
      name: "GitHub",
      link: "https://github.com/hamzakiry",
      icon: <SiGithub aria-label="GitHub" title="GitHub" />,
      hover: "text-xl text-gray-300 cursor-pointer hover:text-white",
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/hamza-kiry",
      icon: <SiLinkedin aria-label="LinkedIn" title="LinkedIn" />,
      hover: "text-xl text-gray-300 cursor-pointer hover:text-white",
    },
    {
      name: "Gmail",
      link: "mailto:hamza.kiry2@gmail.com",
      icon: <SiGmail aria-label="Email Hamza Kiry" title="Gmail" />,
      hover: "text-xl text-gray-300 cursor-pointer hover:text-white",
    },
  ];

  const footerDocsLinks = [
    {
      title: "Navigation",
      child: [
        { name: "Home", type: "route", link: "/" },
        { name: "Projects", type: "route", link: "/projects" },
        { name: "Contact", type: "scroll", link: "contact" },
      ],
    },
  ];

  const footerServiceLinks = [
    {
      title: "Profile",
      child: [
        { name: "GitHub", link: "https://github.com/hamzakiry" },
        { name: "LinkedIn", link: "https://linkedin.com/in/hamza-kiry" },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white">
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-500 bg-black backdrop-blur-md">
        <div className="mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <div className="flex flex-shrink-0 items-center">
              <Link
                className="flex items-center text-xl font-bold no-underline hover:no-underline"
                to="/"
              >
                <span className="bg-gradient-to-r from-gray-300 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  H A M Z A &nbsp; K I R Y
                </span>
              </Link>
            </div>

            <div
              className={`absolute top-0 right-0 h-12 w-full border border-zinc-600 border-t-0 bg-zinc-950/90 px-10 opacity-100 backdrop-blur-sm
              ${
                showNavbar
                  ? "translate-y-16 z-10 opacity-100"
                  : "translate-y-0 -z-10 opacity-0 lg:opacity-100"
              }
              flex items-center justify-around transition-all ease-in-out md:justify-center md:gap-8 md:transition-none
              lg:relative lg:z-0 lg:h-min lg:w-min lg:translate-y-0 lg:border-none lg:bg-transparent lg:px-10 lg:backdrop-blur-0 lg:flex lg:justify-center lg:space-x-10 xl:space-x-14`}
            >
              <Link
                to="/"
                className="text-base font-medium text-gray-300 hover:text-white"
                onClick={() => setShowNavbar(false)}
              >
                Home
              </Link>

              <Link
                to="/projects"
                className="text-base font-medium text-white"
                onClick={() => setShowNavbar(false)}
              >
                Projects
              </Link>

              <button
                type="button"
                onClick={goToHome}
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                About
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Contact
              </button>
            </div>

            <div className="flex items-center justify-end space-x-5">
              <button
                onClick={handleShowNavbar}
                type="button"
                className="p-2 -m-2 text-white transition-all duration-200 hover:text-gray-200 lg:hidden"
              >
                {!showNavbar ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                )}
              </button>

              <div className="group relative">
                <a
                  href="https://github.com/hamzakiry"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  <button className="text-gray-300">
                    <svg
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-8 duration-200 hover:scale-100 hover:stroke-white"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </button>
                </a>

                <span className="absolute -top-14 left-1/2 z-20 origin-left -translate-x-1/2 scale-0 rounded-lg border border-white bg-white px-3 py-2 text-sm font-bold text-black shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  GitHub
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">My Projects</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore all the projects showcased in my portfolio and click to view
            each repository.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-gray-800 bg-neutral-950 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-pink-500"
            >
              <div className="overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-60 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-white">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-5 inline-flex items-center rounded-lg border border-pink-500 px-4 py-2 text-sm font-medium text-pink-400 transition hover:bg-pink-500 hover:text-white">
                  View Project
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="contact" className="border-t border-gray-800 bg-black">
        <div className="mx-auto max-w-screen-xl px-4 pt-8 pb-8 sm:px-6 sm:pt-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-4">
            <div className="text-center lg:text-left">
              <div className="flex h-10 items-center justify-center rounded-lg text-2xl font-extrabold text-white lg:justify-start">
                HAMZA KIRY
              </div>

              <p className="mt-4 text-center text-gray-200 dark:text-gray-400 lg:text-left lg:text-lg">
                Personal developer portfolio showcasing my projects, skills, and
                professional links.
              </p>

              <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                {footerLinks.map((footerLink) => (
                  <li key={footerLink.link} className="list-none">
                    <a
                      href={footerLink.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={footerLink.hover}
                      aria-label={`footer link of ${footerLink.name}`}
                    >
                      {footerLink.icon}
                    </a>
                  </li>
                ))}
              </div>
            </div>

            <div className="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
              <ul className="pt-5 text-center font-medium text-gray-200 lg:text-left">
                {footerDocsLinks.map((section, index) => (
                  <div key={index}>
                    <h3 className="mb-4 text-xl font-extrabold text-gray-200">
                      {section.title}
                    </h3>
                    <ul>
                      {section.child.map((link, linkIndex) => (
                        <li key={linkIndex} className="pt-2">
                          {link.type === "route" ? (
                            <Link
                              to={link.link}
                              className="hover:text-gray-300"
                            >
                              {link.name}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => scrollToSection(link.link)}
                              className="hover:text-gray-300"
                            >
                              {link.name}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>

              <ul className="text-center font-medium text-gray-200 lg:text-left">
                {footerServiceLinks.map((section, index) => (
                  <div key={index}>
                    <h3 className="mt-5 mb-4 text-xl font-extrabold text-gray-200">
                      {section.title}
                    </h3>
                    <ul>
                      {section.child.map((link, linkIndex) => (
                        <li key={linkIndex} className="pt-2">
                          <a
                            href={link.link}
                            className="hover:text-gray-300"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>

              <div className="mt-[25px]">
                <div className="mx-auto rounded-lg p-2">
                  <a
                    href="https://github.com/hamzakiry"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub profile"
                  >
                    <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg border bg-neutral-900 px-10 py-4 p-3 text-left text-base font-bold text-gray-50 duration-500 hover:border-neutral-900 hover:text-neutral-300">
                      <svg
                        className="h-6 w-6 fill-neutral-50"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M50,1.23A50,50,0,0,0,34.2,98.68c2.5.46,3.41-1.09,3.41-2.41s0-4.33-.07-8.5c-13.91,3-16.84-6.71-16.84-6.71-2.28-5.77-5.55-7.31-5.55-7.31-4.54-3.1.34-3,.34-3,5,.35,7.66,5.15,7.66,5.15C27.61,83.5,34.85,81.3,37.7,80a10.72,10.72,0,0,1,3.17-6.69C29.77,72.07,18.1,67.78,18.1,48.62A19.34,19.34,0,0,1,23.25,35.2c-.52-1.26-2.23-6.34.49-13.23,0,0,4.19-1.34,13.75,5.13a47.18,47.18,0,0,1,25,0C72.07,20.63,76.26,22,76.26,22c2.72,6.89,1,12,.49,13.23a19.28,19.28,0,0,1,5.14,13.42c0,19.21-11.69,23.44-22.83,24.67,1.8,1.55,3.4,4.6,3.4,9.26,0,6.69-.06,12.08-.06,13.72,0,1.34.9,2.89,3.44,2.4A50,50,0,0,0,50,1.23Z" />
                      </svg>
                      GITHUB
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 text-center">
            <p className="mx-auto text-gray-200">
              © Hamza Kiry {getCurrentYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}