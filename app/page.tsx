import { projects, experiences, certifications, skills } from "@/lib/data"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { Certifications } from "@/components/sections/certifications"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/layout/footer"

export default function Portfolio() {

  return (
    <div className="min-h-screen transition-all duration-500 bg-background text-foreground">
      <main>
        <Hero />
        <About skills={skills} />
        <Projects projects={projects} />
        <ExperienceSection experiences={experiences} />
        <Certifications certifications={certifications} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
