import ProjectsSection from "@/components/projects/ProjectsSection";
import PageTitle from "@/components/ui/PageTitle";
import PageContainer from "@/components/layout/PageContainer";

export const metadata = {
  title: "Projects",
  description:
    "Explore Sam Chen's projects across IC design, EDA, embedded systems, and computer architecture.",
};

export default function ProjectPage() {
  return (
    <PageContainer>
      <PageTitle title="My Projects" />
      <div className="container mx-auto px-4">
        <ProjectsSection />
      </div>
    </PageContainer>
  );
}
