import { BrowserRouter, Routes, Route } from "react-router-dom"; // * import router
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
export default function App() {
  // ! Membuat routing file pada react component
  return (
    <BrowserRouter>
    {/* Membuat Header, header ini akan berada pada semua routesnya apapun pagenya tetap aan ada */}
    <Header />

    {/*  Membuat Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      
    </BrowserRouter>
  )
}
