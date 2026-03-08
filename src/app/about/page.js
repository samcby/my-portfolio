import AboutSection from "@/components/about/AboutSection";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";

export const metadata = {
  title: "About",
  description:
    "Learn about Sam Chen's background, education, experience, and research focus in microelectronics and ECE.",
};

export default function AboutPage() {
  return (
    <PageContainer>
      <PageTitle title="About Me" />
      <div className="container mx-auto px-4">
        <AboutSection />
      </div>
    </PageContainer>
  );
}
