import { useState } from 'react';
import { FaUser, FaBox, FaCreditCard, FaBook, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuOptions = [
    { icon: <FaUser />, label: 'Profile' },
    { icon: <FaBox />, label: 'Orders' },
    { icon: <FaCreditCard />, label: 'Payment History' },
    { icon: <FaBook />, label: 'My Collections' },
    { icon: <FaDollarSign />, label: 'Refer & Earn' },
    { icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  const handleMenuClick = (label: any) => {
    alert(`Clicked on ${label}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">

      <img
        src="https://www.w3schools.com/w3images/avatar2.png"
        alt="profile"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={toggleMenu}
      />


      {isMenuOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-lg w-48 p-2 z-50 border border-gray-200 mt-2"
        >
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() => handleMenuClick(option.label)}
            >
              <span className="text-blue-500">{option.icon}</span>
              <span className="text-gray-700">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Profile;
