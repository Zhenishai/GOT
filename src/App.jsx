import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/Auth";
import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import Quiz from "./pages/Quiz";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
    const isGallery = location.pathname === "/episodes";

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <AudioPlayer />
  <Navbar hiddenByDefault={isGallery} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
