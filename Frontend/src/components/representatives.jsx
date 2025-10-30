import React from "react";


const representativesData = [
    {
      name: "Nishant Kumar",
      department: "Electronics and Communication",
      img: "Nishant.png",
      Batch: "2021-25",
    },
    {
      name: "Md Nafees Alam",
      department: "Electronics and Communication",
      img: "Nafees.png",
      Batch: "2021-25",
    },
    {
      name: "Prince Kumar",
      department: "Electronics and Communication",
      img: "Prince.png",
      Batch: "2021-25",
    },
  ];

const Representatives = () => {
  return (
    <>
    <h2 className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-yellow-600">
    Student Representatives
      </h2>
    <div className="flex flex-wrap justify-evenly mt-5 mb-20 gap-6 w-[80vw] mx-auto">
      {representativesData.map((representative) => (
        <div
          key={representative.name + representative.department}
          className="card group w-64 h-80 rounded-xl shadow-lg bg-white overflow-hidden flex flex-col my-3 items-center p-4 transition-transform transform hover:scale-105 hover:pt-0 hover:px-0 drop-shadow-lg"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden mb-0 mt-6 transition-all duration-500 group-hover:rounded-none group-hover:h-3/5 group-hover:mt-0 group-hover:p-0 group-hover:w-full">
            <img
              src={`./image/${representative.img}`}
              alt={representative.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="flex flex-row justify-evenly gap-1 flex-wrap items-baseline text-center mt-6">

              <h2 className="text-lg font-bold  text-gray-900">
                {representative.name}
              </h2>
              <span className="text-xs">{representative.Batch}</span>
            </div>
          <p className="text-sm text-gray-500 mt-4">{representative.department}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Representatives;
