import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/SideBar';
import ManageProjects from './Components/ManageProjects';
import ManageEmployees from './Components/ManageEmployees';
import Advertisement from './Components/Advertisement';
import CustomerSupport from './Components/CustomerSupport';
import AdminLogin from './Components/AdminLogin'; // Import AdminLogin component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync authentication state with localStorage on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <div style={styles.container}>
        {isAuthenticated && <Sidebar />} {/* Show Sidebar if authenticated */}
        <div style={styles.content}>
          <Routes>
            <Route
              path="/admin-login"
              element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/manage-projects"
              element={isAuthenticated ? <ManageProjects /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/manage-employees"
              element={isAuthenticated ? <ManageEmployees /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/advertisement"
              element={isAuthenticated ? <Advertisement /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/customer-support"
              element={isAuthenticated ? <CustomerSupport /> : <Navigate to="/admin-login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    marginLeft: '200px',
    padding: '20px',
    width: '100%',
  },
};

export default App;
