import React from "react";

const Facilities = () => {
  return (
    <>
      <h2 className="text-5xl mt-20 font-bold font-heading mb-4 text-center text-[#1d6b6f]">
        E-Yantra Lab Facilities
      </h2>
      <div className="flex flex-row flex-wrap mx-auto w-[80vw] mb-8">
        <div className="w-full lg:w-1/2 px-2 md:px-8">
          <ul className="py-4 px-2 bg-custom-gradient rounded-md">
            <h2 className="text-2xl font-bold font-heading mb-4 text-center text-[#36756f]">
              Equipment's and Hardware
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 3D Printer (Ender 3 Model)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">
                  🚀 General Purpose Board
                  <ul className="grid grid-cols-2">
                    <li className="bg-[#b1ece6] rounded-md pl-8 pt-3 text-[black]">
                      🤖 RaspberryPi 3A+
                    </li>
                    <li className="bg-[#b1ece6] rounded-md pl-8 pt-3 text-[black]">
                      🤖 STM 32
                    </li>
                    <li className="bg-[#b1ece6] rounded-md pl-8 pt-3 text-[black]">
                      🤖 TM4C123G Launchpad
                    </li>
                    <li className="bg-[#b1ece6] rounded-md pl-8 pt-3 text-[black]">
                      🤖 ESP 32 and ESP 8266
                    </li>
                    <li className="bg-[#b1ece6] rounded-md pl-8 pt-3 text-[black]">
                      🤖 Arduino UNO
                    </li>
                  </ul>
                </p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">
                  🚀 Sensors (Gyro Sensor, Colour Sensor, RF Transceiver)
                </p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 Servomotors</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 Xbee Pro</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 Other Accessories</p>
              </li>
            </div>
          </ul>
        </div>
        <div className="w-full lg:w-1/2 px-2 md:px-8 ">
          <ul className="py-4 px-2 bg-custom-gradient rounded-md">
            <h2 className="text-2xl font-bold font-heading mb-4 text-center text-[#36756f]">
              Available Software
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 SolidWorks (Licensed)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 MATLAB-Simulink (Licensed)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 Proteus (Licensed)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 ROS (Open Source)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 CoppeliaSim (Open Source)</p>
              </li>
              <li className="bg-[#b1ece6] rounded-md p-2 mt-2">
                <p className="mt-2 text-sm text-[black]">🚀 Python (Open Source) </p>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Facilities;
