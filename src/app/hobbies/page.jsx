import Interest from "@/components/hobbies/Interest";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";

export const metadata = {
  title: "Hobbies",
  description:
    "A look at Sam Chen's interests beyond engineering, including music, videography, travel, games, movies, and volunteering.",
};

const HobbiesPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Hobbies" />
      <Interest />
    </PageContainer>
  );
};

export default HobbiesPage;
