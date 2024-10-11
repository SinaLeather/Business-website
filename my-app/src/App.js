import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import HeroSecition from './components/hero';
import CategorySection from './components/category.';
import Card from './components/card';
import Testimonial from './components/Testimonial';
import AddOrder from './components/AddOrder';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
   <>  
  <Router>
  <Routes>
    <Route path="/register" element={<RegistrationForm />}  />
    <Route path="/" element={<Navbar />} />
  </Routes>
  </Router>,
  <HeroSecition />,
  <CategorySection />,
  <Card />,
  <Testimonial />,
  <AddOrder />
   </>
  );
};

export default App;