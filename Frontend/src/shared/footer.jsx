import React from "react";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";
import { fadeIn } from "../shared/varients";

const Footer = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ once: true }}
        className="w-screen bg-[#c7e6e2]  pt-6 pb-6 pl-[5vw] pr-[5vw] mx-auto  grid grid-cols-1 md:grid-cols-[30%_70%]  gap-4 items-center justify-between "
      >
        <div className="left flex flex-col">
          <Link to="/" className="w-[50vw] md:w-[25vw] flex flex-row ">
            <img src="./image/geck.gif" alt="Logo" className=" h-20 " />
            <img src="./image/e_yantra.svg" alt="Logo" className=" " />
          </Link>
          <a
            className="flex flex-row items-center justify-center mt-7"
            target="_blank"
            href="https://maps.app.goo.gl/C4dsR1JaaVNWVXcb7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 mr-2 text-red-600"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 4.68 5.4 10.72 6.71 12.12a1 1 0 0 0 1.58 0C13.6 19.72 19 13.68 19 9c0-3.87-3.13-7-7-7m0 18C9.5 17 7 12.85 7 9a5 5 0 1 1 10 0c0 3.85-2.5 8-5 11m0-13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
            <span className="">Our Location</span>
          </a>
        </div>

        <div className="right w-full ">
          <div className=" text-black grid grid-cols-1 lg:grid-cols-3  items-center gap-3 w-[80%]   mx-auto">
            <Link to="/about" className="hover:text-gray-400 w-fit ">
              About
            </Link>
            <Link to="/coordinator" className="hover:text-gray-400">
              Coordinator
            </Link>
            <Link to="/video-lectures" className="hover:text-gray-400">
              Video Lectures
            </Link>
            <Link to="/onGoingProjects" className="hover:text-gray-400">
              On going Projects
            </Link>
            <Link to="/exhibition" className="hover:text-gray-400">
              Exhibition
            </Link>
            <Link to="/competition" className="hover:text-gray-400">
              Competition
            </Link>

            <Link to="/collaboration" className="hover:text-gray-400">
              Collaboration
            </Link>
            <Link
              to="/student-representatives"
              className="hover:text-gray-400"
            >
              Representatives
            </Link>
            <Link to="/participants" className="hover:text-gray-400">
              Participants
            </Link>

            <Link to="/contact" className="hover:text-gray-400">
              Contact Us
            </Link>
            <Link to="/developer" className="hover:text-gray-400">
              Developer
            </Link>
            <Link to="/admin-login" className="hover:text-gray-400">
              Admin Login
            </Link>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-evenly text-gray-600 text-sm  w-[70%]">
            <div className="text-center py-4">
              <p className="">
                All rights reserved. <span>&#169;</span> e-Yantra
              </p>
            </div>
            <div className="flex justify-center">
              Developed ❤️ by
              <a
                target="_blank"
                className="text-red-700 hover:text-red-500 ml-1"
              //  href=""
              >
                E-Yantra
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Footer;
