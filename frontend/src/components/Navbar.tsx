import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../features/categorySlice';
import { setSearch } from '../features/imagesSlice';
import UserLogin from '../auth/UserLogin';
import axios from 'axios';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const fetchUniqueTags = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/V1/tag/imagetags`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching unique tags:', error.message);
      throw new Error('Failed to fetch unique tags');
    }
  };

  useEffect(() => {
    const fetchAndSetTags = async () => {
      try {
        const fetchedTags = await fetchUniqueTags();
        setTags(fetchedTags);
      } catch (error: any) {
        console.error('Error fetching tags:', error.message);
      }
    };

    fetchAndSetTags();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    dispatch(setCategory(selectedCategory));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    console.log(searchTerm)
    dispatch(setSearch(value));
  };

  return (
    <header className="text-gray-600 body-font bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex-shrink-0">PicPoster</div>
        <div className="relative flex items-center w-full max-w-lg mx-4 bg-gray-100 rounded-full shadow-md">
          <div className="flex items-center border-r border-gray-300 px-4">
            <select
              className="bg-transparent focus:outline-none text-gray-700"
              defaultValue="All Categories"
              onChange={handleCategoryChange}
            >
              <option>All Categories</option>
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-2 px-4 text-gray-700 bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex-shrink-0">
          <UserLogin />
        </div>
      </div>
    </header>
  );
}
