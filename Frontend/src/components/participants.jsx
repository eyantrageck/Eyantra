import React from "react";

const participants24 = [
  {
    name: "Nishant Kumar",
    roll: "22104142908",
    branch: "ECE",
    email: "nishantraj8340@gmail.com",
  },
  {
    name: "Md Nafees Alam",
    roll: "21104142006",
    branch: "ECE",
    email: "nafeesalam281@gmail.com",
  },
  {
    name: "Kajal Kumari",
    roll: "22104142901",
    branch: "ECE",
    email: "kajalkumariwrs2567@gmail.com",
  },
  {
    name: "Prince Kumar",
    roll: "21104142004",
    branch: "ECE",
    email: "princekm2003@gmail.com",
  },
  {
    name: "Gautam Kumar",
    roll: "22104142903",
    branch: "ECE",
    email: "gautam.ece104@gmail.com",
  },
  {
    name: "Nidhi Ranjan",
    roll: "22104142924",
    branch: "ECE",
    email: "nidhisingh020406@gmail.com",
  },
  {
    name: "Abhishek Kumar",
    roll: "21104142003",
    branch: "ECE",
    email: "abhishekkr14apk@gmail.com",
  },
 
 
  {
    name: "Md Faiyaz Alam",
    roll: "23104142904",
    branch: "ECE",
    email: "alamfaiyaz469@gmail.com",
  },
  {
    name: "Md. Zaid Hashmi",
    roll: "23104142908",
    branch: "ECE",
    email: "hashmibhai4756@gmail.com",
  },
  {
    name: "Nitu Kumari",
    roll: "23104142910",
    branch: "ECE",
    email: "nitukumari28102002@gmail.com",
  },

  {
    name: "Krishna Kumari",
    roll: "23104142903",
    branch: "ECE",
    email: "krishnavinod819@gmail.com",
  },
  {
    name: "Kavita Bharti",
    roll: "23104142907",
    branch: "ECE",
    email: "kavitabharti0112245@gmail.com",
  },
  {
    name: "Sapna Kumari",
    roll: "23104142905",
    branch: "ECE",
    email: " kumarisapna71399@gmail.com ",
  },
  {
    name: "Shyam Mishra ",
    roll: "23157142018",
    branch: "CSE(AI/ML)",
    email: "shyamkumarmishra1234@gmail.com",
  },
  {
    name: "Shaili Kumari",
    roll: "23157142026",
    branch: "CSE(AI&ML)",
    email: "shailikumari60@gmail.com",
  },
  {
    name: "Nidhi Rani",
    roll: "22104142001",
    branch: "ECE",
    email: "nidhirani07032003@gmail.com",
  },
  {
    name: "Akshay Kumar",
    roll: "24520",
    branch: "CSE",
    email: "akshayrishu4@gmail.com",
  },
  {
    name: "Kunal Kumar",
    roll: "24619",
    branch: "CSE(AI/ML)",
    email: "kingkunalkumar9@gmail.com",
  },
  {
    name: "Alisha Kumari",
    roll: "24545",
    branch: "CSE",
    email: "alishakumari75329@gmail.com",
  },
  {
    name: "Mahima Kumari",
    roll: "24508",
    branch: "CSE",
    email: "mahimabgp870@gmail.com",
  },
  {
    name: "Ritu Kumari",
    roll: "24535",
    branch: "CSE",
    email: "ritukumari552006@gmail.com",
  },
  {
    name: "Gulshan Kumar",
    roll: "24514",
    branch: "CSE",
    email: "gk5120909@gmail.com",
  },
  {
    name: "Kamal Deep Raj",
    roll: "24604",
    branch: "CSE(AI/ML)",
    email: "kamaldeepraj90600@gmail.com",
  },
  {
    name: "Modassir Zahid",
    roll: "24612",
    branch: "CSE(AI/ML)",
    email: "modassirz1326@gmail.com",
  },
  {
    name: "Ashish Kr. Singh",
    roll: "24601",
    branch: "CSE(AI/ML)",
    email: "ashishofficial2789@gmail.com",
  },
  {
    name: "Khushnandan Kumar",
    roll: "24622",
    branch: "CSE(AI/ML)",
    email: "khushnandan2k24@gmail.com",
  },
  {
    name: "Radhika Kumari",
    roll: "24651",
    branch: "CSE(AI/ML)",
    email: "radhikaraj845411@gmail.com",
  },
  {
    name: "Jyotsna",
    roll: "24646",
    branch: "CSE(AI/ML)",
    email: "jyotsna558@gmail.com",
  },
  {
    name: "Shahid Munir",
    roll: "24621",
    branch: "CSE(AI/ML)",
    email: "shahidmunir9631@gmail.com",
  },
  {
    name: "Sweta Singh",
    roll: "24638",
    branch: "CSE(AI/ML)",
    email: "swetasingh0229@gmail.com",
  },
  {
    name: "Ankita Kumari",
    roll: "24645",
    branch: "CSE(AI/ML)",
    email: "kumariankitasingh954@gmail.com",
  },
  {
    name: "Hrithik Raj",
    roll: "24608",
    branch: "CSE(AI/ML)",
    email: "hrithikraj6400@gmail.com",
  },
  {
    name: "Aryan Kumar",
    roll: "24630",
    branch: "CSE(AI/ML)",
    email: "aryankumar20092004@gmail.com",
  },
  {
    name: "Aparna Sinha",
    roll: "24648",
    branch: "CSE(AI/ML)",
    email: "aparnasinha106@gamil.com",
  },
  {
    name: "Komal",
    roll: "24631",
    branch: "CSE(AI/ML)",
    email: "kr5636207@gmail.com",
  },
  {
    name: "Pragati Kumari",
    roll: "24633",
    branch: "CSE(AI/ML)",
    email: "pragatisingh9939@gmail.com",
  },
];

const Participants = () => {
  return (
    <>
      <h2 className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-yellow-600">
        Participants
      </h2>
      <div className="md:w-[80vw] mx-auto max-w-screen overflow-y-scroll md:overflow-y-hidden">
        <table className="min-w-full mb-8">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-[#4c4a4a84] text-sm">S.No</th>
              <th className="py-2 px-4 border-b border-[#4c4a4a84] text-sm">Name</th>
              <th className="py-2 px-4 border-b border-[#4c4a4a84] text-sm">Reg. No</th>
              <th className="py-2 px-4 border-b border-[#4c4a4a84] text-sm">Branch</th>
              <th className="py-2 px-4 border-b border-[#4c4a4a84] text-sm">Email</th>
            </tr>
          </thead>
          <tbody>
            {participants24.map((participant, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-[#4c4a4a84] text-center text-xs">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-[#4c4a4a84] text-center text-xs">
                  {participant.name}
                </td>
                <td className="py-2 px-4 border-b border-[#4c4a4a84] text-center text-xs">
                  {participant.roll}
                </td>
                <td className="py-2 px-4 border-b border-[#4c4a4a84] text-center text-xs">
                  {participant.branch}
                </td>
                <td className="py-2 px-4 border-b border-[#4c4a4a84] text-center text-xs">
                  {participant.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Participants;
