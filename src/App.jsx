import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Domains from './pages/Domains.jsx';
import User from './pages/User.jsx';
import Quiz from './pages/Quiz.jsx';
import Results from './pages/Results.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Domains />} />
        <Route path="/User" element={<User />} />
        <Route 
          path="/Quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route path="/Results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
