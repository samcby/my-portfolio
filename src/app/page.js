import dynamic from "next/dynamic";
import PageContainer from "@/components/layout/PageContainer";
import HeroSection from "@/components/home/hero/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Home",
  description:
    "Landing page for Sam Chen's portfolio, featuring highlighted projects, background, and contact information.",
};

const ProjectsSection = dynamic(() => import("@/components/projects/ProjectsSection"), {
  loading: () => <div>Loading...</div>,
});

const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div>Loading...</div>,
});

const EmailSection = dynamic(() => import("@/components/contact/EmailSection"), {
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  return (
    <PageContainer>
      <main className="bg-[var(--page-bg)]">
        <div className="container mx-auto px-4 py-4 sm:px-6 md:px-8 lg:px-12">
          <HeroSection />
          <div className="mt-16 sm:mt-20">
            <SectionTitle title="About Me" />
            <AboutSection />
          </div>
          <div className="mt-16 sm:mt-20">
            <SectionTitle title="Featured Projects" />
            <ProjectsSection compact />
          </div>
          <div className="mt-16 mb-16 sm:mt-20 sm:mb-24">
            <SectionTitle title="Contact Me" />
            <EmailSection />
          </div>
        </div>
      </main>
    </PageContainer>
  );
}
