"use client";

const Navbar = () => {
  return (
    <nav
      className="fixed col-start-2 col-end-3 px-4 top-0  left-1/2 -translate-x-1/2 z-50 bg-violet-600 w-full max-w-[60ch] h-20 flex items-center justify-between "
      // style={{ height: "80px" }}
    >
      <div className="text-white font-semibold text-lg">Logo here</div>
      <div className="flex items-center gap-4 text-white">
        <div className="text-sm">Person goes here</div>
        <button className="text-sm bg-transparent">Settings</button>
        <button className="text-sm bg-transparent">Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
