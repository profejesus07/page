import About from "../components/home/About";
import BlogPreview from "../components/home/BlogPreview";
import CategoryCards from "../components/home/CategoryCards";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Services />
      <About />
      <BlogPreview />
    </>
  );
}
