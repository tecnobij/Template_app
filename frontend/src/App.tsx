import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useIsMobile from "./hooks/useIsMobile";
import BottomNavigation from "./components/BottomNavigation";
import VideoPlayer from "./components/VideoPlayer";
import ImageList from "./components/ImageList";
import { Provider } from "react-redux";
import store from "./app/store";
import TagsGrid from "./components/TagImageCard";
import RegisterForm from "./auth/Register";
import Dashboard from "./components/UserDashboard";
import SlideShow from "./components/SlideShow";
import Login from "./auth/Login";
import TagDetail from "./components/TagDetail";
import ImageDetails from "./components/ImageDetails";
import UserLogin from "./auth/UserLogin";

const App: React.FC = () => {
  const isMobile = useIsMobile();

  const handleSwitchToLogin = () => {
    console.log("Switch to login");
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <VideoPlayer />
          <TagsGrid />
          {<ImageList />}
          <Routes>
            <Route path="/slideshow" element={<SlideShow />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/register"
              element={
                <RegisterForm
                  onClose={() => console.log("Close RegisterForm")}
                  onSwitchToLogin={handleSwitchToLogin}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/UserLogin" element={<UserLogin />} />
            <Route path="/tag/:id" element={<TagDetail />} />
            <Route path="/image-details" element={<ImageDetails />} />
          </Routes>
          <Footer />
          {isMobile && <BottomNavigation />}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
