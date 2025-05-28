import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home Page - Welcome to VedAlert</h2>
    <Link to="/login">Go to Login</Link><br />
    <Link to="/signup">Go to Signup</Link>
  </div>
);

export default Home;
