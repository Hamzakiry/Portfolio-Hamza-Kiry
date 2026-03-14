"use client";

import { useState } from "react";
import { HeroParallax } from "./components/ui/hero-parallax";
import { Meteors } from "./components/ui/meteors";
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si";
import { products } from "./profileData/projects";

import Card1 from "./images/Card_1.png";
import Card2 from "./images/Card2.jpeg";
import Card3 from "./images/Card_3.png";

export default function Home() {
  const getCurrentYear = () => new Date().getFullYear();
  const [showNavbar, setShowNavbar] = useState(false);

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
        { name: "Home", link: "/" },
        { name: "Projects", link: "/projects" },
        { name: "Contact", link: "#contact" },
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

  function handleShowNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (
    <section>
      {/* Navbar */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-500 bg-black backdrop-blur-md">
        <div className="mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <div className="flex flex-shrink-0 items-center">
              <a
                className="flex items-center text-xl font-bold no-underline hover:no-underline"
                href="/"
              >
                <span className="bg-gradient-to-r from-gray-300 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  H A M Z A &nbsp; K I R Y
                </span>
              </a>
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
              <a
                href="/Portfolio-Hamza-Kiry/#/"
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Home
              </a>

              <a
                href="/Portfolio-Hamza-Kiry/#/projects"
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Projects
              </a>

              <a
                href="/Portfolio-Hamza-Kiry/#/about"
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                About
              </a>

              <a
                href="/Portfolio-Hamza-Kiry/#/contact"
                className="text-base font-medium text-gray-300 hover:text-white"
              >
                Contact
              </a>
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

      {/* Hero */}
      <HeroParallax products={products} />

      {/* About / Features */}
      <div
        id="about"
        className="flex flex-col items-center justify-center bg-white py-8 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black sm:text-4xl xl:text-5xl xl:leading-tight">
            Building, Learning & Showcasing My Work
          </h1>
        </div>

        <div className="text-center">
          <p className="mb-8 text-base font-normal leading-7 text-gray-600 lg:max-w-md">
            I am Hamza Kiry, a developer passionate about creating modern, useful,
            and visually engaging digital experiences.
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Card 1 */}
          <div className="max-w-xs rounded-md bg-black p-4 text-center shadow-md">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              ABOUT ME
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              I enjoy building web applications, exploring UI/UX ideas, and turning
              concepts into real products through clean and practical code.
            </p>
            <div className="v ab bb dc bf cf">
              <img className="zg zc" src={Card1} alt="About Hamza Kiry" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative max-w-xs overflow-x-hidden rounded-md bg-black p-4 text-center shadow-md">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              PROJECTS
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              From portfolio websites to practical apps, I like building projects
              that combine design, functionality, and real-world usefulness.
            </p>
            <div className="v ab bb dc bf cf ih wh">
              <img className="zg zc" src={Card2} alt="Projects by Hamza Kiry" />
            </div>
            <Meteors number={10} />
          </div>

          {/* Card 3 */}
          <div className="max-w-xs rounded-md bg-black p-4 text-center shadow-md">
            <h3 className="mt-4 mb-2 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
              CONTACT
            </h3>
            <p className="p-5 tracking-tighter text-neutral-500">
              I’m open to collaboration, freelance work, and new opportunities.
              Feel free to reach out and connect with me.
            </p>
            <div className="v ab bb dc bf cf ih wh">
              <img className="zg zc" src={Card3} alt="Contact Hamza Kiry" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
                          <a
                            href={link.link}
                            className="hover:text-gray-300"
                            rel="noopener noreferrer"
                          >
                            {link.name}
                          </a>
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