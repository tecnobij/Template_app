import React, { useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

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

  return (
    <div className="flex justify-center items-center mt-5 mb-5">
      <div
        className="hidden sm:grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 overflow-x-auto px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {tags.map((tag) => (
          <div
            key={tag._id}
            className="relative flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
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
      <div className="sm:hidden flex overflow-x-scroll space-x-4 p-4">
        {tags.map((tag) => (
          <div
            key={tag._id}
            className="flex-shrink-0 w-[100px] relative flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={tag.image}
              alt={tag.tag}
              className="w-[80px] h-[80px] object-cover"
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
