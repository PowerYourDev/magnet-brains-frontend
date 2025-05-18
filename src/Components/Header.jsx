import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Hamburger icon
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white px-4 py-3 shadow relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold cursor-pointer">Task Manager</h1>

        
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-white focus:outline-none cursor-pointer"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      
      {menuOpen && (
        <div className="absolute right-4 top-full mt-2 bg-white text-black rounded shadow-lg w-48 z-50">
          <ul className="flex flex-col">
            <li>
              <Link
                to="/task-create"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Task create
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/my-tasks"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                My Tasks
              </Link>
            </li>
           
            {/* <li>
              <Link
                to="/logout"
                className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Logout
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
