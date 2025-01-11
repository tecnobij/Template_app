const VideoPlayer = () => {
  return (
    <div className="relative w-full h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dlt4haf5f/video/upload/v1734012748/ulewxwu4jx0bsj0nkpyp.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
        <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-md text-center">
          Spark Endless Creation with Premium Design Assets
        </h1>
        <p className="text-white text-lg font-medium drop-shadow-md text-center">
          Unlock the World's Leading Royalty-Free Design Collection
        </p>
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
          />
        </svg>
      </div>
    </div>
  );
};

export default VideoPlayer;
