import React from "react";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function HomePage() {
  return (
    <>
      <section id="home" className="min-h-screen">
        <div className="container mx-auto ">
          <h1 className="text-5xl font-bold mb-6">Kaml Mehamednur</h1>
          <p className="text-xl mb-4">
            Software Engineer | Problem Solver | Designer (UI/UX)
          </p>
        </div>
      </section>

      <About />
      <Projects />
      <Contact />
    </>
  );
}

export default HomePage;
