import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchTerm, handleSearchChange }) => {
  const navigateToGitHub = () => {
    const githubRepoUrl = "https://github.com/hamzakiry/Awesome-Dev-Portfolios";
    window.open(githubRepoUrl, "_blank");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="button">
          <div className="box">P</div>
          <div className="box">O</div>
          <div className="box">R</div>
          <div className="box">T</div>
          <div className="box">E</div>
          <div className="box">F</div>
          <div className="box">O</div>
        </Link>
      </div>

      <div className="search-filter">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Name"
        />

        <button onClick={navigateToGitHub} className="text-gray-300">
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
      </div>
    </nav>
  );
};

export default Navbar;