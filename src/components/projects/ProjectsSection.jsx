"use client";
import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectTag from "@/components/projects/ProjectTag";
import PROJECT_DATA from "@/data/projectData";
import { useTheme } from "@/context/ThemeContext";

const SORT_OPTIONS = {
  featured: "Featured first",
  newest: "Newest first",
  alphabetical: "A-Z",
};

const ProjectsSection = ({ compact = false }) => {
  const [tag, setTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(compact ? "featured" : "newest");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { isDarkMode } = useTheme();

  const tagOptions = useMemo(
    () => [
      "All",
      ...new Set(PROJECT_DATA.flatMap((project) => project.tag.filter((item) => item !== "All"))),
    ],
    []
  );

  const stats = useMemo(() => {
    return {
      total: PROJECT_DATA.length,
      featured: PROJECT_DATA.filter((project) => project.featured).length,
      areas: new Set(
        PROJECT_DATA.flatMap((project) => project.tag.filter((item) => item !== "All"))
      ).size,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let projects = PROJECT_DATA.filter((project) => {
      const matchesTag = tag === "All" || project.tag.includes(tag);
      const haystack = [project.title, project.description, project.year, ...(project.stack || []), ...(project.tag || [])]
        .join(" ")
        .toLowerCase();
      const matchesSearch = normalizedSearch === "" || haystack.includes(normalizedSearch);

      return matchesTag && matchesSearch;
    });

    projects = [...projects].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "newest") {
        const yearDiff = (b.year || 0) - (a.year || 0);
        return yearDiff !== 0 ? yearDiff : (a.id || 0) - (b.id || 0);
      }

      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured);
      }

      const yearDiff = (b.year || 0) - (a.year || 0);
      return yearDiff !== 0 ? yearDiff : (a.id || 0) - (b.id || 0);
    });

    if (compact) {
      const featuredProjects = projects.filter((project) => project.featured);
      return (featuredProjects.length > 0 ? featuredProjects : projects).slice(0, 6);
    }

    return projects;
  }, [compact, searchTerm, sortBy, tag]);

  const cardVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="flex flex-col items-center">
      <div className="grid w-full max-w-[1200px] gap-4 sm:grid-cols-3">
        {[
          { label: "Projects", value: stats.total },
          { label: "Featured", value: stats.featured },
          { label: "Focus Areas", value: stats.areas },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border px-5 py-4 ${
              isDarkMode ? "border-[#586e75] bg-[#073642]" : "border-[#93a1a1] bg-[#e6eef8]"
            }`}
          >
            <p className={`text-sm ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>{item.label}</p>
            <p className={`mt-2 text-3xl font-bold ${isDarkMode ? "text-white" : "text-[#002b36]"}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="mt-8 flex w-full max-w-[1200px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, skill, or topic"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors ${
                isDarkMode
                  ? "border-[#586e75] bg-[#073642] text-[#fdf6e3] placeholder-[#93a1a1]"
                  : "border-[#93a1a1] bg-[#e6eef8] text-[#002b36] placeholder-[#586e75]"
              }`}
            />
          </div>
          <div className="lg:w-[220px]">
            <label htmlFor="project-sort" className="sr-only">
              Sort projects
            </label>
            <select
              id="project-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors ${
                isDarkMode
                  ? "border-[#586e75] bg-[#073642] text-[#fdf6e3]"
                  : "border-[#93a1a1] bg-[#e6eef8] text-[#002b36]"
              }`}
            >
              {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-sm sm:text-base">
          <p className={isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}>
            A quick view of the projects that best represent my recent work.
          </p>
          <Link href="/projects" className="font-semibold text-[#268bd2] hover:text-[#2aa198]">
            View all
          </Link>
        </div>
      )}

      <div
        className={`mt-6 flex flex-wrap items-center justify-center gap-2 py-2 text-sm transition-colors duration-300 ${
          isDarkMode ? "text-[#93a1a1]" : "text-[#002b36]"
        }`}
      >
        {tagOptions.map((item) => (
          <ProjectTag key={item} onClick={setTag} name={item} isSelected={tag === item} />
        ))}
      </div>

      {!compact ? (
        <p className={`mb-6 text-sm ${isDarkMode ? "text-[#93a1a1]" : "text-[#586e75]"}`}>
          Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
          {searchTerm ? ` for "${searchTerm}"` : ""}.
        </p>
      ) : null}

      {filteredProjects.length > 0 ? (
        <ul ref={ref} className="grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <ProjectCard {...project} imgUrl={project.image} />
            </motion.li>
          ))}
        </ul>
      ) : (
        <div
          className={`mt-6 w-full max-w-[1200px] rounded-2xl border px-6 py-10 text-center ${
            isDarkMode ? "border-[#586e75] bg-[#073642] text-[#93a1a1]" : "border-[#93a1a1] bg-[#e6eef8] text-[#586e75]"
          }`}
        >
          No projects match that filter yet. Try another keyword or category.
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
