import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImagesFromSlider, incrementPage } from '../features/imagesSlice';
import { RootState, AppDispatch } from '../app/store';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { debounce } from '@mui/material';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const ImageList: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error, hasMore, page, search, hasMore_search } = useSelector((state: RootState) => state.images);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const downloadRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    console.log("infirst", search)
    if (hasMore && !loading) {
      console.log("FSFSFf")
      dispatch(fetchImagesFromSlider({ page, search }));
    }
  }, [dispatch, page, search, hasMore, loading]);
  useEffect(() => {
    console.log("insecond", search)

    if (search !== undefined && !loading && hasMore_search) {

      console.log(loading, page, hasMore_search, search)
      dispatch(fetchImagesFromSlider({ page, search }));
    }
  }, [dispatch, page, search, hasMore_search, loading]);
  const filteredImages = images.filter((image: any) =>
    selectedCategory === 'All Categories' || image.tag?.includes(selectedCategory)
  );
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDownload = (index: number) => {
    const ref = downloadRefs.current[index];
    if (ref) {
      html2canvas(ref, { scale: 2, useCORS: true }).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `image-card-${index}.png`;
        link.click();
      });
    }
  };
  const handleImageClick = (image: any) => {
    console.log(image)
    navigate('/image-details', {
      state: {
        imageUrl: image.imageUrl,
        tag: image.tag?.join(', '),
      },
    });
  };

  const handleScroll = useCallback(debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      dispatch(incrementPage());
    }
  }, 300), [dispatch, hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  if (loading) {
    return <p className="col-span-full text-center text-gray-500">Loading...</p>;
  }
  if (filteredImages.length === 0 && !loading) {
    return <div>No images available for the selected category.</div>;
  }

  return (
    <div className="image-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 lg:mx-[200px]">
      {filteredImages.map((item: any, index: number) => (
        <div
          className="image-card group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 bg-white hover:scale-105 transform"
          key={`${item._id + index}`}
          onClick={() => handleImageClick(item)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500 via-blue-300 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" ></div>

          <div className="relative z-10"
            ref={(el) => {
              if (el) downloadRefs.current[index] = el;
            }} >
            <img

              src={item.imageUrl}
              alt={item.tag?.join(', ')}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          </div>

          <div className="p-4 bg-white relative z-20 rounded-b-2xl group-hover:bg-blue-50 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <p className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md font-semibold transition-all duration-300">
                {item.tag?.join(', ')}
              </p>

              <div className="flex items-center space-x-4 text-gray-600">
                <button
                  className="hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Image Liked!');
                  }}
                >
                  <ThumbUpOutlinedIcon fontSize="small" />
                </button>
                <button
                  className="hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(item.imageUrl).then(() => {
                      alert('Image link copied to clipboard!');
                    });
                  }}
                >
                  <ShareOutlinedIcon fontSize="small" />
                </button>
                <button
                  className="hover:text-blue-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(index);
                  }}
                >
                  <DownloadOutlinedIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {!hasMore && <p className="col-span-full text-center text-gray-700">No more images to load.</p>}
    </div>
  );
};

export default ImageList;
