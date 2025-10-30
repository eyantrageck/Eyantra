import React from "react";

const project = [
  {
    name: "Robotic Arm (Prototype)",
    img: "./image/5.jpg",
    team: ["Kamal Deep Raj", "Ashish Kumar Singh", "Modassir Zahid", "Radhika Kumari","Khushnandan Kumar"]
  },
  {
    name: "Biometric Data on Website",
    img: "./image/1.jpg",
    team: ["Akshay Kuamr", "Kunal Kuamr", "Alisha Kumari", "Ritu Kumari","Mahima Kumari"]
  },
  {
    name: "Intelligent Street Lighting System",
    img: "./image/3.jpg",
    team: ["Hrithik Raj", "Aryan Kumar", "Aparna Kumari", "Komal Poddar"]
  },
  {
    name: "Smart Dustbin",
    img: "./image/2.jpg",
    team: ["Shahid Munir", "Ankita Kumari", "Sweta Singh", "Jyotsna"]
  },
  {
    name: "Robo Car (Protype)",
    img: "",
    team: ["", "", "", ""]
  },
  {
    name: "Smart Agriculture Prototype",
    img: "",
    team: ["", "", "", ""]
  },
  {
    name: "Hexapod (Mathematical Modelling, Simulation, Prototype)",
    img: "",
    team: ["", "", "", ""]
  },
];

const OnGoing = () => {
  return (
    <>
      <h2 className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-yellow-600">
        On Going Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 ">
        {project.map((proj, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="h-[30vh] md:h-[15vh] lg:h-[30vh] w-[100%] md:w-[30vw]" src={proj.img || "https://dummyimage.com/360x360"} alt={proj.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{proj.name}</div>
              <ul className="grid grid-cols-2 ">
                {proj.team.map((member, idx) => (
                  <li key={idx} className="w-fit ">{member}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OnGoing;
