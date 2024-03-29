import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between py-2 mx-auto bg-slate-700 text-white">
        <div className="logo">
          <span className="font-bold text-xl mx-8">iTask</span>
        </div>
        <ul className="flex gap-8 mx-5">
            <li className="cursor-pointer hover:font-bold">Home</li>
            <li className="cursor-pointer hover:font-bold">Tasks</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
