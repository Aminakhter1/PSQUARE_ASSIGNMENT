
import './App.css';
import CandidateForm from './components/Candidate/CandidateForm';
import Candidates from './pages/Candidates';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from './pages/Employees';
import Attendances from './pages/Attendances';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import ProtectedRoute from './pages/ProtectedRoute'; // Import the ProtectedRoute component
import Leave from './pages/Leave';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/add-candidate" element={<CandidateForm />} />
          
          <Route
            path="/candidates"
            element={
              <ProtectedRoute>
                <Candidates />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route path="/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />
          
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendances />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
