import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-zinc-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            {/* Weitere Links hier */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
