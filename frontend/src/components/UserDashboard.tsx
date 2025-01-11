import React, { useState, useEffect } from 'react';
import { FaUser, FaDollarSign, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [_error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    if (!accessToken) {
      navigate('/UserLogin');
    } else {
      fetchUserDetails(accessToken);
    }
  }, [accessToken, navigate]);

  const fetchUserDetails = async (token: string | null) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserDetails(response.data.data);
      setFormData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching user details:', error.message);
      setError('Failed to fetch user details');
      navigate('/UserLogin');
    }
  };

  const handleLogout = () => {
    navigate('/UserLogin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormSubmit = async () => {
    const formPayload = new FormData();
    formPayload.append('fullname', formData.fullname);
    formPayload.append('email', formData.email);
    formPayload.append('username', formData.username);
    formPayload.append('phoneno', formData.phoneno);
    if (formData.avatar) {
      formPayload.append('avatar', formData.avatar);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/user/edit-profile`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsEditing(false);
      fetchUserDetails(accessToken);
      setAvatarPreview(null);
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      setError('Failed to update profile');
    }
  };

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <label className="block mb-2 text-gray-600">Avatar</label>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-24 h-24 mb-2 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 border rounded-lg cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleFormSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setAvatarPreview(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={userDetails?.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {userDetails?.fullname}
              </h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {userDetails?.email}
              </p>
              <p className="text-gray-600">
                <strong>Username:</strong> {userDetails?.username}
              </p>
              <p className="text-gray-600">
                <strong>Phone Number:</strong> {userDetails?.phoneno}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-[calc(100%-400px)] bg-white shadow-lg rounded-lg">
        <div className="flex">
          <button
            className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div
            className={`fixed md:static z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } md:translate-x-0 md:block`}
          >
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-blue-600">My Dashboard</h1>
            </div>
            <nav className="p-4">
              {[
                { icon: <FaUser />, label: 'Profile' },
                { icon: <FaDollarSign />, label: 'Refer & Earn' },
                { icon: <FaSignOutAlt />, label: 'Logout', action: handleLogout },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.label);
                    if (item.action) item.action();
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center p-3 rounded-lg mb-2 transition-colors ${activeSection === item.label
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <main className="flex-1 md:ml-64 p-6">{renderProfileContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
