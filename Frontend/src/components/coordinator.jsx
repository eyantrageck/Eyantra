import React from "react";
import { delay, motion } from "framer-motion";
import { rotate, card, fadeIn } from "./varients";

const coordinatorData = [
  // {
  //   name: "Akshay Kumar",
  //   department: "Computer Science and Engineering",
  //   img: "AkshayPic.jpg",
  // },
  {
    name: "Mr. Saket Saurabh",
    department: "Mechanical Engineering",
    img: "Shak.jpeg",
  },
  {
    name: "Mr. Rigvendra Kr. Vardhan",
    department: "Electronics and Communication",
    img: "Rig.png",
  },
  {
    name: "Miss Manita Kumari",
    department: "Electrical Engineering",
    img: "Manita.png",
  },
  {
    name: "Mr. Lalan Kumar Ram",
    department: "Computer Science and Engineering",
    img: "lalan.png",
  },
];

const Coordinator = () => {
  return (
    <>
      <motion.h2
        variants={fadeIn("down", 40, 0)}
        initial="hidden"
        whileInView={"show"}
        transition={{ ease: "linear", duration: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-yellow-600"
      >
        Coordinator
      </motion.h2>

      <div className="flex flex-wrap justify-evenly mt-5 mb-20 gap-6 w-[80vw] mx-auto">
        {coordinatorData.map((coordinator) => (
          <div
            key={coordinator.name + coordinator.department}
            className="card group w-64 h-80 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col my-3 items-center p-4 transition-transform transform hover:scale-105 hover:pt-0 hover:px-0 drop-shadow-lg"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-0 mt-6 transition-all duration-500 group-hover:rounded-none group-hover:h-3/5 group-hover:mt-0 group-hover:p-0 group-hover:w-full">
              <img
                src={`./image/${coordinator.img}`}
                alt={coordinator.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <h2 className="text-lg font-bold mt-6 text-gray-900">
              {coordinator.name}
            </h2>
            <p className="text-sm text-gray-500 mt-4">
              {coordinator.department}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Coordinator;
