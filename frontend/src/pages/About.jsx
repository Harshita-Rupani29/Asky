import React from "react";
import Headrer from "../components/Header";
import Footer from "../components/footer";
import { FaLinkedin } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="font-poppins">
      <Headrer />

      <section className="bg-gray-100 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-opacity duration-700 ease-in-out">
            Welcome to Q&A Hub
          </h1>
          <p className="text-xl text-gray-600 transition-transform duration-700 ease-in-out">
            Empowering Learners Through Questions & Collaboration
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 transition duration-700 ease-in-out">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600 mb-4">
            QA Hub is more than a Q&A site. It's a space where passion for
            learning meets collaboration. Whether you’re a student, a teacher,
            or an enthusiast, you’ll find support and answers here.
          </p>
          <p className="text-lg text-gray-600">
            Dive into meaningful conversations, connect with others, and grow
            together on your learning path.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Platform Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 " style={{cursor:"pointer"}}>
            {[
              { icon: "💬", title: "Interactive Q&A", text: "Ask thoughtful questions and receive well-structured answers." },
              { icon: "🏆", title: "Vote & Rank", text: "Help highlight the best responses by upvoting insightful answers." },
              { icon: "🧠", title: "Learn Together", text: "Work on shared projects and exchange knowledge in real-time." },
              { icon: "🌐", title: "Explore Topics", text: "Browse a wide array of categories and discussions." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 shadow rounded text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <span className="text-4xl mb-2 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 transition-opacity duration-700">
            How to Participate
          </h2>
          <p className="text-lg text-gray-600">
            Create an account to start asking, answering, and voting. Engage in
            your own learning and help others along the way.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 transition-opacity duration-700">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            For technical support or feedback, contact the developer: Harshita Rupani
          </p>
          <a
            href="https://www.linkedin.com/in/harshita-rupani/"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white"
          >
            <FaLinkedin /> Linkedin: @harshita-rupani
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
