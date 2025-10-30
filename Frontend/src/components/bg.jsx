import React from 'react'

const Bg = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 -z-20"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#74cac2] blur-3xl rounded-full opacity-50"></div>
        <div className="absolute top-80 -right-20 w-[700px] h-[500px] bg-[#42a096] blur-3xl rounded-full opacity-30"></div>
        <div className="absolute top-1/3 -left-1/4 w-[800px] h-[600px] bg-[#74cac2]  blur-3xl rounded-full opacity-30"></div>
        <div className="absolute top-[70%] right-0 w-[500px] h-[600px] bg-[#42a096] blur-3xl rounded-full opacity-20"></div>
        <div className="absolute top-[85%] -left-1/3 w-[1000px] h-[500px] bg-[#74cac2] blur-3xl rounded-full opacity-30"></div>
      </div>
    </div>
  )
}

export default Bg
