
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 md:px-24">
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
