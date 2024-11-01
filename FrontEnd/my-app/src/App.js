import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ReviewPage from "./Pages/ReviewPage";
import NotFoundPage from "./Pages/PageNotFound";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<LoginPage />} /><Route path="/signup" element={<SignUpPage />} />

        <Route path="/review" element={<ReviewPage/>}/>
        <Route path="/*" element={<NotFoundPage/>}/>


      </Routes>

      <Footer />
    </>
  );
}

export default App;
