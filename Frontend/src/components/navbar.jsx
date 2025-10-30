import React from "react";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";
import { fadeIn } from "./varients";
const Navbar = () => {
  return (
    <div className="bg-[#42a096] text-white p-4 pr-4  font-sans sticky top-0 z-50">
      <div className="flex flex-col md:flex-row justify-between sm:items-center sm:gap-32 z-10">
        <motion.div
          variants={fadeIn("down", 40, 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true}}
          className="w-[50vw] md:w-[25vw] flex flex-row "
        >
          <Link to="/">
            <img
              src="./image/geck.gif"
              alt="Logo"
              className=" h-12 lg:h-20 w-24 lg:w-24  "
            />
          </Link>
          <Link to="https://www.geckishanganj.org/" target="_blank">
            <img src="./image/e_yantra.svg" alt="Logo" className=" " />
          </Link>
        </motion.div>
        <motion.nav 
         variants={fadeIn("down", 40, 0)}
         initial="hidden"
         whileInView={"show"}
         viewport={{ once: true}}
          className="flex flex-row flex-wrap gap-4 text-lg">
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/coordinator" className="hover:text-gray-400">
            Coordinator
          </Link>
          <div className="relative group">
            <div className="hover:text-gray-400 cursor-pointer">Resource</div>
            <div className="absolute left-0 md:right-0 mt-0 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible z-50">
              <Link
                to="/video-lectures"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Lectures
              </Link>

              <Link
                to="/documents"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Documents
              </Link>
              <Link
                to="/facilities"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Facilities
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="hover:text-gray-400 cursor-pointer">Project</div>
            <div className="absolute right-0 mt-0 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible z-50">
              <Link
                to="/onGoingProjects"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                On going Projects
              </Link>
              <Link
                to="/exhibition"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Exhibition
              </Link>
              <Link
                to="/competition"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Competition
              </Link>
            </div>
          </div>
          <Link to="/collaboration" className="hover:text-gray-400">
            Collaboration
          </Link>
          {/* <div className="relative group">
            <div className="hover:text-gray-400 cursor-pointer">Students</div>
            <div className="absolute right-0 mt-0 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
              <Link
                to="/student-representatives"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Representatives
              </Link>
              <Link
                to="/participants"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Participants
              </Link>
            </div>
          </div> */}

          <div className="relative group/item">
            {/* Main menu item */}
            <div className="hover:text-gray-400 cursor-pointer">
              AetherSwarm
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-0 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-opacity duration-300">
              <Link
                to="/coordinator"
                className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
              >
                Coordinator
              </Link>
              <div className="relative group/student">
                <div className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400 cursor-pointer">
                  Students
                </div>

                {/* Sub-menu (Only visible when hovering "Students") */}
                <div className="absolute right-[-50%] md:right-full top-full md:top-0 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg opacity-0 invisible group-hover/student:opacity-100 group-hover/student:visible transition-opacity duration-300">
                  <Link
                    to="/student-representatives"
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
                  >
                    Representatives
                  </Link>
                  <Link
                    to="/participants"
                    className="block px-4 py-2 hover:bg-gray-700 hover:text-gray-400"
                  >
                    Participants
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="/contact" className="hover:text-gray-400">
            Contact Us
          </Link>
          <Link to="/developer" className="hover:text-gray-400">
            Developer
          </Link>
        </motion.nav>
      </div>
    </div>
  );
};

export default Navbar;
