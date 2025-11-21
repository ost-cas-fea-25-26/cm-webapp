import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-20 w-full items-center bg-violet-600 px-8 py-3">
      <div className="flex w-full items-center justify-between gap-2">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Mumble
        </Link>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4 text-white">
          <div className="text-sm">Person goes here</div>
          <button className="text-sm hover:opacity-80">Settings</button>
          <button className="text-sm hover:opacity-80">Log Out</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
