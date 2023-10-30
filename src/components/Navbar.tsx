import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  userName: string | null;
  handleSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, handleSignOut }) => {
  return (
    <div className=" bg-gray-400 w-full">
      <div className="navbar container m-auto w-full py-4 flex justify-between text-white font-bold">
        <span>Firebase Authentication</span>
        {userName && (
          <button onClick={handleSignOut}>
            <FaSignOutAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
