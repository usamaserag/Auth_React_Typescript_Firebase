import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  userName: string | null;
  handleSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, handleSignOut }) => {
  return (
    <div className="navbar w-full p-4 flex justify-between bg-gray-400 text-white font-bold">
      <span>Firebase Authentication</span>
      {userName && (
        <button onClick={handleSignOut}>
         <FaSignOutAlt />
        </button>
      )}
    </div>
  );
};

export default Navbar;
