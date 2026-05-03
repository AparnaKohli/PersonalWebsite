import { AboutSection } from "@/app/components/about-section";
import { BrandStrip } from "@/app/components/brand-strip";
import { EducationSection } from "@/app/components/education-section";
import { ExperienceSection } from "@/app/components/experience-section";
import { Hero } from "@/app/components/hero";
import { ContactSection } from "@/app/components/contact-section";
import { PortfolioSection } from "@/app/components/portfolio-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { SkipNav } from "@/app/components/skip-nav";

export default function Home() {
  return (
    <>
      <SkipNav />
      <SiteHeader />
      <main id="main-content" className="pb-6">
        <Hero />
        <BrandStrip />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
