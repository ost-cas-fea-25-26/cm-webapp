"use client";

import { LogoLink } from "@krrli/cm-designsystem";

const Navbar = () => {
  return (
    <div className="col-span-3 bg-violet-600 h-[80px]">
      <nav className="col-start-2 col-end-3 h-[80px] flex items-center justify-between bg-transparent px-8 py-3 gap-2 opacity-100">
        {/* Left: Logo */}
        <div className="text-white font-semibold text-lg">
          <LogoLink />
        </div>
        {/* Right: User Actions */}
        <div className="flex items-center gap-2 text-white">
          <div className="text-sm">Person goes here</div>
          <button className="text-sm bg-transparent">Settings</button>
          <button className="text-sm bg-transparent">Log Out</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
