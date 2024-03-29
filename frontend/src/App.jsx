import { BrowserRouter, Routes, Route } from "react-router-dom"; // * import router
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import SignRoute from "./components/SignRoute";
import Footer from "./components/Footer";
import PdfSummarizer from "./pages/PdfSummarizer";
import YoutubeSummarizer from "./pages/YoutubeSummarizer";
import Users from "./pages/Users";
export default function App() {
  // ! Membuat routing file pada react component
  return (
    <BrowserRouter>
      {/* Membuat Header, header ini akan berada pada semua routesnya apapun pagenya tetap akan ada */}
      <Header />

      {/*  Membuat Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route element={<SignRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        {/* Membuat route private yang hanya akan di akses apabila user sudah login */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/pdfsummarizer" element={<PdfSummarizer />} />
          <Route path="/youtubesummarizer" element={<YoutubeSummarizer />} />
        </Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}
