
const LanguageSelection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-10/12 max-w-4xl sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Select Language</h2>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button className="py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            English
          </button>
          <button className="py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Hindi
          </button>
          <button className="py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Marathi
          </button>
          <button className="py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Gujarati
          </button>
        </div>
        <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300">
          CREATE NOW
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
