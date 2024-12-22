import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer';
import Header from '../Header';

const TrackSubsidy = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get the username passed from the previous page
  const location = useLocation();
  const username = location.state?.username || '';

  useEffect(() => {
    const fetchSubsidies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/subsidy/user/${username}`);
        setSubsidies(response.data);
      } catch (err) {
        console.error('Error fetching subsidies:', err);
        setError('Failed to fetch subsidies. Please try again later.');
      }
    };

    if (username) {
      fetchSubsidies();
    } else {
      setError('No username provided. Unable to fetch subsidies.');
    }
  }, [username]);

  const handleViewStatus = (applicationNumber) => {
    navigate(`/subsidy-status/${applicationNumber}`);
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-header text-center bg-gradient-primary  py-3">
            <h1 className="mb-0">Your Subsidy Applications</h1>
          </div>
          <div className="card-body p-4">
            {username && <h2 className="text-center text-primary">Welcome, {username}!</h2>}
            {error && <p className="text-danger text-center mt-3 fw-bold">{error}</p>}

            <ul className="list-group mt-4">
              {subsidies.length > 0 ? (
                subsidies.map((subsidy) => (
                  <li
                    key={subsidy.applicationNumber}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 border-0 rounded"
                  >
                    <div>
                      <p className="mb-1 fw-bold">
                        Application Number: <span className="text-muted">{subsidy.applicationNumber}</span>
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong> <span className={`badge ${subsidy.status === 'Subsidy is approved and go to next step on bank' ? 'bg-success' : subsidy.status === 'In the process' ? 'bg-warning' : 'bg-danger'}`}>{subsidy.status}</span>
                      </p>
                    </div>
                    <button
                      className="btn btn-primary btn-sm px-3"
                      onClick={() => handleViewStatus(subsidy.applicationNumber)}
                    >
                      View Details
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-center text-muted">No subsidy applications found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TrackSubsidy;
