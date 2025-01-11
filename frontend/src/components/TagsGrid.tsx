import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface TagData {
  _id: string;
  tag: string;
  image: string;
}

const TagsGrid: React.FC = () => {
  const [tags, setTags] = React.useState<TagData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/V1/tag/`);
        setTags(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tags");
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const handleCardClick = (id: string) => {
    navigate(`/tag/${id}`);
  };

  return (
    <div className="flex justify-center items-center mt-5 mb-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 px-4">
        {tags.map((tag) => (
          <div
            key={tag._id}
            onClick={() => handleCardClick(tag._id)}
            className="relative cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={tag.image}
              alt={tag.tag}
              className="w-[100px] h-[100px] object-cover"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-center text-white text-xs font-semibold py-1">
              {tag.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsGrid;
