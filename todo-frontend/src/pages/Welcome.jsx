import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="fade-in">Welcome to <span className="brand-highlight">ZenTasker</span></h1>
        <p className="subtitle fade-in">Your premium task management solution.</p>
        <p className="quote fade-in">A calm and mindful approach to productivity. 🌿</p>
        <Link to="/login">
          <button className="get-started-btn slide-in">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
