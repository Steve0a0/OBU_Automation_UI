import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import onebill from '../images/onebill.png';

const Navbar = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme);
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={onebill} className="h-8" alt="Flowbite Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{props.company}</span> */}
        </a>
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:order-2">
          {/* <button
            onClick={toggleTheme}
            className="text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button> */}
          {/* <Link to="/login">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {props.login}
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
