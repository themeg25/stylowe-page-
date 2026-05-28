import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <header className="header">
        <h1>Stylo Hair Studio</h1>
        <p>Your Style, Your Identity</p>
      </header>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Welcome to Stylo Hair Studio. We create modern hairstyles,
          beard styling, hair coloring and premium grooming experiences.
        </p>
      </section>

      <section className="forms">
        <div className="card">
          <h2>Register</h2>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Register</button>
        </div>

        <div className="card">
          <h2>Login</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
      </section>

      <section className="gallery">
        <h2>Trending Hairstyles</h2>
        <div className="images">
          <img src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186" alt="Hair 1" />
          <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004" alt="Hair 2" />
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1" alt="Hair 3" />
        </div>
      </section>
    </div>
  );
}

export default App;