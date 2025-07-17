import '../styles/HomePage.css';
import { motion } from "framer-motion";


export default function StorageApp() {
  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="logo">NaijaStorage</div>
        <div className="nav-buttons">
          <button className="btn login">Login</button>
          <button className="btn signup">Sign Up</button>
        </div>
      </nav>

      <main className="main-content">
        <section id="home" className="section home-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Simple, Secure & Affordable Storage</h1>
            <p>
              Empowering small businesses in Nigeria with reliable and cost-effective
              data storage solutions.
            </p>
            <img src="/valeriia-svitlini-5W0ZBR8PS-4-unsplash.jpg" alt="Cloud Storage" className="hero-img" />
          </motion.div>
        </section>

        <section id="about" className="section about-section">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>About Us</h2>
            <p>
              We provide secure, scalable, and affordable cloud storage solutions designed specifically for the needs of small businesses in Nigeria. Our goal is to simplify data management while ensuring safety and accessibility.
            </p>
          </motion.div>
        </section>

        <section id="contact" className="section contact-section">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Contact Us</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> abdulhamidabari652@gmail.com</p>
              <p><strong>Phone:</strong> +234 801 234 5678</p>
              <p><strong>Country:</strong> Nigeria</p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}