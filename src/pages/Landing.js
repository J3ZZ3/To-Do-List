import React from "react";
import { Link } from "react-router-dom";
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">ToDo List</h1>
      <div className="landing-links">
        <p>
          Already have an account? <Link to="/Login">login here</Link>
        </p>
        <p>
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Landing;
