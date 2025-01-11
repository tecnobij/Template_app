import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface TagData {
  _id: string;
  tag: string;
  image: string;
}

const TagDetail: React.FC = () => {
  const { id } = useParams();
  const [tag, setTag] = useState<TagData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTagDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/V1/tag/${id}`);
        setTag(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tag details");
        setLoading(false);
      }
    };

    fetchTagDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:underline"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">{tag?.tag}</h1>
        <img
          src={tag?.image}
          alt={tag?.tag}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default TagDetail;
