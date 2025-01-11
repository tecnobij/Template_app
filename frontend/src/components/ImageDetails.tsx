import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import UserLogin from '../auth/UserLogin';

interface UserDetails {
  avatar: string;
  fullname: string;
  username: string;
  email: string;
  phoneno?: string;
}

const ImageDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.state);
  const tag = queryParams.get('tag');
  const imageUrl = queryParams.get('imageUrl');
  console.log(imageUrl)
  const accessToken = localStorage.getItem('accessToken');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [avatarShape, setAvatarShape] = useState<'circle' | 'square' | 'rounded'>('circle');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({
    width: 300,
    height: 150,
  });

  const downloadRef = useRef<HTMLDivElement>(null);
  const resizableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserDetails = async (token: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/V1/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data.data)
      } catch (err: any) {
        setError('Failed to fetch user details. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchUserDetails(accessToken);
    else {
      setError('No access token provided');
    }
  }, [accessToken]);

  const handleDownload = () => {
    if (downloadRef.current) {
      html2canvas(downloadRef.current, { scale: 2, useCORS: true }).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'downloaded-card.png';
        link.click();
      });
    }
  };

  const toggleAvatarShape = () => {
    setAvatarShape((prev) =>
      prev === 'circle' ? 'square' : prev === 'square' ? 'rounded' : 'circle'
    );
  };

  const handleResize = (e: React.MouseEvent) => {
    const startWidth = boxSize.width;
    const startHeight = boxSize.height;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(150, startWidth + moveEvent.clientX - startX);
      const newHeight = Math.max(100, startHeight + moveEvent.clientY - startY);
      setBoxSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-200 transition"
      >
        &larr; Back
      </button>
      <div className="absolute top-4 right-4 flex items-center space-x-3">
        <div className="relative">
          <button
            className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => document.getElementById('color-picker')?.click()}
          >
            🎨 <span className="ml-2">Pick Color</span>
          </button>
          <input
            id="color-picker"
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <button
          onClick={handleDownload}
          className="bg-green-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <FontAwesomeIcon icon={faDownload} />
          <span className="ml-2">Download</span>
        </button>
      </div>
      {error && <UserLogin />}
      <div
        ref={downloadRef}
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Tag: ${tag}`}
            className="w-full h-[500px] object-cover"
          />
        )}

        {userDetails && (
          <Draggable bounds="parent">
            <div
              ref={resizableRef}
              style={{ width: boxSize.width, height: boxSize.height, backgroundColor }}
              className="absolute bottom-6 left-6 rounded-lg shadow-md p-4 cursor-move"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={userDetails.avatar}
                  onDoubleClick={toggleAvatarShape}
                  alt="Avatar"
                  className={`w-16 h-16 ${avatarShape === 'circle'
                    ? 'rounded-full'
                    : avatarShape === 'square'
                      ? 'rounded-none'
                      : 'rounded-lg'
                    } object-cover border-2 border-blue-500`}
                />
                <div className="flex flex-col break-all">
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setUserDetails({ ...userDetails, fullname: e.target.textContent || '' })}
                    className="text-lg font-semibold outline-none"
                  >
                    {userDetails.fullname}
                  </p>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setUserDetails({ ...userDetails, username: e.target.textContent || '' })}
                    className="text-gray-500 outline-none"
                  >
                    @{userDetails.username}
                  </p>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setUserDetails({ ...userDetails, email: e.target.textContent || '' })}
                    className="text-gray-500 outline-none"
                  >
                    {userDetails.email}
                  </p>
                  <p
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => setUserDetails({ ...userDetails, phoneno: e.target.textContent || '' })}
                    className="text-gray-500 truncate outline-none"
                  >
                    {userDetails.phoneno || 'Add Phone Number'}
                  </p>
                </div>
              </div>
              <div
                onMouseDown={handleResize}
                className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize"
              />
            </div>
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default ImageDetails;
