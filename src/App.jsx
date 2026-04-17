import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FriendDetail from "./pages/FriendDetail";
import Timeline from "./pages/Timeline";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";
import { TimelineProvider } from "./context/TimelineContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <TimelineProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
          <Navbar />
          <main className="flex-1 pt-[68px]">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/friend/:id" element={<FriendDetail />} />
              <Route path="/timeline"   element={<Timeline />} />
              <Route path="/stats"      element={<Stats />} />
              <Route path="*"           element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1B3A2D",
              color: "#fff",
              border: "1px solid #2D6A4F",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
            },
          }}
        />
      </BrowserRouter>
    </TimelineProvider>
  );
}
