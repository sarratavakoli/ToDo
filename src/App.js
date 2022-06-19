//style
import './App.css';
// import 'https://use.typekit.net/gvm0qti.css'

//pakidge
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//components
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ToDos from './components/ToDos/ToDos';
import Categories from './components/Categories/Categories';
import Login from './components/Auth/Login';
import NotFound from './components/NotFound';
import AuthProvider from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          {/* <Header /> */}

          <Navigation />
          <div className="flex-wrapper">
            <Routes>
              <Route path="/" element={<ToDos />} />
              <Route path="/todos" element={<ToDos />} />
              <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>


          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
