import React from "react";
import { delay, motion } from "framer-motion";
import { rotate, card, fadeIn } from "../shared/varients";

const devloperData = [
  {
    name: "Mr. Rigvendra Kr. Vardhan",
    department: "Electronics and Communication",
    img: "Rig.png",
    insta: "",
    linkedin: "",
    Email: "",
    GitHub: "",

  },
  {
    name: "Md Nafees Alam",
    department: "Electronics and Communication",
    img: "Nafees.png",
    reg: "21104142006",
    insta: "https://www.instagram.com/nafeesalam281/",
    linkedin: "https://www.linkedin.com/in/md-nafees-alam-218a1322a/",
    Email: "nafeesalam281@gmail.com",
    GitHub: "https://github.com/nafeesalam281",
    Batch: "2021-25",
  },
  {
    name: "Akshay Kumar",
    department: "Computer Science and Engineering",
    img: "AkshayPic.jpg",
    reg: "24105142007",
    insta: "https://www.instagram.com/akshay__rishu/",
    linkedin: "https://www.linkedin.com/in/akshay-kumar-93b487215/",
    Email: "akshayrishu4@gmail.com",
    GitHub: "https://github.com/akshay0712-dev",
    Batch: "2024-28",
  },
];

const Devloper = () => {
  return (
    <>
      <motion.h2
        variants={fadeIn("down", 40, 0)}
        initial="hidden"
        whileInView={"show"}
        transition={{ ease: "linear", duration: 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-yellow-600"
      >
        Developer
      </motion.h2>
      <div className="flex flex-wrap justify-center mt-5 mb-20 gap-20 w-[80vw] mx-auto">
        {devloperData.map((devloper) => (
          <div
            key={devloper.name + devloper.department}
            className="card group w-64 h-80 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col my-3 items-center p-4 transition-transform transform hover:scale-105 hover:pt-0 hover:px-0 drop-shadow-lg"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-0 mt-6 transition-all duration-500 group-hover:rounded-none group-hover:h-3/5 group-hover:mt-0 group-hover:p-0 group-hover:w-full">
              <img
                src={`./image/${devloper.img}`}
                alt={devloper.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="flex flex-row justify-evenly gap-1 flex-wrap items-baseline text-center mt-6">

              <h2 className="text-lg font-bold  text-gray-900">
                {devloper.name}
              </h2>
              <span className="text-xs">{devloper.Batch}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{devloper.department}</p>
            <p className={`text-sm text-gray-500 mt-2 ${!devloper.reg && "hidden"}`}>
              Registation No: {devloper.reg}
            </p>

            <div className="flex space-x-3 mt-4 mb-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-blue-500 ${!devloper.linkedin && "hidden"}`}
                href={devloper.linkedin}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-blue-400 ${!devloper.Email && "hidden"}`}
                href={`mailto:${devloper.Email}`}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V423c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.5c0-4.9 5.8-7.8 9.7-4.7C23 207.4 71.8 248 219.3 355c10.9 7.9 32.9 26.3 54.7 26.3s43.8-18.4 54.7-26.3c147.4-107 196.2-147.6 173.6-164.2zM256 320c11.6 0 34.1-17.2 44.1-24.3 152.3-110.6 163.9-120.5 187.8-138.1 5.8-4.3 9.1-11 9.1-18V88c0-26.5-21.5-48-48-48H63c-26.5 0-48 21.5-48 48v51.6c0 7 3.3 13.7 9.1 18 23.9 17.6 35.5 27.5 187.8 138.1 10.1 7.2 32.6 24.3 44.1 24.3z"></path>
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-gray-900 ${!devloper.GitHub && "hidden"}`}
                href={devloper.GitHub}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 496 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-pink-500 ${!devloper.insta && "hidden"}`}
                href={devloper.insta}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Devloper;
