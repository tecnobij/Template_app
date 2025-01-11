import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from './Register';
export default function UserLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const [log, setlog] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsRegister(false);
  };
  const [formData, setFormData] = useState({
    phoneno: '',
    password: '',
  });
  useEffect(() => {
    if (accessToken) {
      console.log(1)
      setlog(true)
    }
  }, [])
  const [showPassword] = useState(false);
  const [_error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/V1/user/login`,
        {
          phoneno: formData.phoneno,
          password: formData.password,
        }
      );

      const { accessToken } = response.data;
      if (response.status === 200) {
        setlog(true);
        setAvatar(response.data.user.avatar)

        setIsModalOpen(false);
        localStorage.setItem('accessToken', accessToken)
      }
      alert('Login Successful');
      navigate('/dashboard', { state: { accessToken } });

    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  console.log(log)

  return (
    <>
      {!log && <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-6 py-2 rounded-xl"
      >
        Login
      </button>}
      {log &&
        <img
          src={avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {isRegister ? (
              <RegisterForm
                onClose={toggleModal}
                onSwitchToLogin={() => setIsRegister(false)}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      placeholder="Enter Password"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
                <button
                  onClick={() => setIsRegister(true)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-xl mt-4"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
