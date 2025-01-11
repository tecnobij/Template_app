import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesFromSlider } from '../features/imagesSlice';
import { RootState, AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

interface Image {
  _id: string;
  imageUrl: string;
  tag: string;
}

const SlideShow: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { images, loading, error, hasMore, page } = useSelector(
    (state: RootState) => state.images
  );

  useEffect(() => {
    dispatch(fetchImagesFromSlider({ page }));
  }, [dispatch, page]);

  const handleNextClick = () => {
    if (hasMore) dispatch(fetchImagesFromSlider({ page: page + 1 }));
  };

  const handlePrevClick = () => {
    if (page > 1) dispatch(fetchImagesFromSlider({ page: page - 1 }));
  };

  const handleImageClick = (image: Image) => {
    navigate(
      `/image-details?tag=${image.tag}&id=${image._id}&imageUrl=${encodeURIComponent(
        image.imageUrl
      )}`
    );
  };

  if (loading && images.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (images.length === 0) return <div>No images available.</div>;

  return (
    <div className="p-6 lg:mx-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image: Image, index: number) => (
          <div
            key={`${image._id}-${index}`}
            onClick={() => handleImageClick(image)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 bg-white hover:scale-105 transform"
          >
            <img
              src={image.imageUrl}
              alt={image.tag}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4 bg-white rounded-b-2xl">
              <div className="flex items-center justify-between">
                <p className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md font-semibold">
                  {image.tag}
                </p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <button aria-label="Like">
                    <ThumbUpOutlinedIcon />
                  </button>
                  <button aria-label="Share">
                    <ShareOutlinedIcon />
                  </button>
                  <button aria-label="Download">
                    <DownloadOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrevClick}
          disabled={page === 1}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          disabled={!hasMore}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
