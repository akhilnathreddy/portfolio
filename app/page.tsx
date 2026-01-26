import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-foreground selection:bg-primary/30 selection:text-white">
      <Hero />
      <TechStack />
      <Projects />
      <Contact />

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Akhil. All rights reserved.</p>
      </footer>
    </main>
  );
}
