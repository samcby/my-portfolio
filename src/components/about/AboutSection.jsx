"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TabButton from "@/components/ui/TabButton";
import TabDataContent from "@/data/tabData";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { MdWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaGraduationCap, FaCertificate, FaTrophy } from "react-icons/fa";

const AboutSection = () => {
  const [tab, setTab] = useState("experience");
  const [isPending, startTransition] = useTransition();
  const { isDarkMode } = useTheme();
  const TAB_DATA = TabDataContent();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      id="about"
      className={`flex flex-col gap-6 sm:gap-8 relative items-center theme-text ${
        isDarkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        {/* Content area - Image and text side by side */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Image area */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-full max-w-[300px] relative rounded-xl overflow-hidden theme-shadow">
              <Image
                src="/images/selfies.jpg"
                alt="Sam Chen"
                width={300}
                height={300}
                priority
                className="w-full h-auto rounded-xl transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            </div>
          </div>

          {/* Text area */}
          <div className="md:col-span-8 w-full">
            <h3 className="text-xl font-bold mb-4 theme-primary">About Me</h3>

            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-left leading-relaxed">
              <p>
                I am <span className="font-semibold">Sam Chen</span>, a 
                passionate and energetic IC enthusiast with a solid foundation in 
                microelectronics science. I hold a B.E. in Microelectronics Science 
                and Engineering and am currently pursuing a M.S. in ECE at UCLA. 
                I came from Guangzhou, 🇨🇳, and currently live in Los Angeles, California. 
                I can speak Mandarin and English, and am relatively proficient in Cantonese, 
                but I still need to improve. 
              </p>

              <p>
                I specialize in circuit and circuit board design, including 
                analog, digital, and PCB design, using tools like{" "}
                <span className="font-medium theme-primary">
                  Cadence Virtuoso, Vivado, and Altium Designer
                </span>
                , etc.. I'm also proficient in software development and writing 
                using computer programming languages ​​like Python, Matlab, and C. 
                Currently, my expertise spans multiple IC-related areas, including 
                front-end circuit design, EDA, hardware acceleration, FPGAs, and devices.
              </p>

              <p>
                I have had relevant research experience in different fields with 
                different professors at{" "}
                <span className="font-semibold theme-secondary">UCLA and SYSU</span>{" "}
                I also have practical internship experience at
                <span className="font-semibold theme-accent">
                  {" "}
                  BTD and the Guangdong Greater Bay Area Institute of 
                  Integrated Circuit and System 
                </span>
                .
              </p>

              <p>
                Besides my professional life, I like playing piano, traveling, 
                taking photos and videos and playing games🎮. I also love cats🐱, 
                although I don’t have my own cat yet.
              </p>
              <p className="mt-3 text-sm italic theme-primary">
                <Link
                  href="/hobbies"
                  className="cursor-pointer hover:underline"
                >
                  Know more about my hobbies →
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px my-8 theme-divider"></div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
          <TabButton
            selectTab={() => handleTabChange("experience")}
            active={tab === "experience"}
          >
            <span className="flex items-center gap-1.5">
              <MdWork className="text-lg" />
              <span>Experience</span>
            </span>
          </TabButton>
          {/* <TabButton
            selectTab={() => handleTabChange("skills")}
            active={tab === "skills"}
          >
            <span className="flex items-center gap-1.5">
              <GiSkills className="text-lg" />
              <span>Skills</span>
            </span>
          </TabButton> */}
          <TabButton
            selectTab={() => handleTabChange("education")}
            active={tab === "education"}
          >
            <span className="flex items-center gap-1.5">
              <FaGraduationCap className="text-lg" />
              <span>Education</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("certifications")}
            active={tab === "certifications"}
          >
            <span className="flex items-center gap-1.5">
              <FaCertificate className="text-lg" />
              <span>Certifications</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("awards")}
            active={tab === "awards"}
          >
            <span className="flex items-center gap-1.5">
              <FaTrophy className="text-lg" />
              <span>Awards</span>
            </span>
          </TabButton>
        </div>

        {/* Tab content with card style */}
        <motion.div
          className="mt-6 sm:mt-8 w-full p-4 sm:p-6 rounded-xl theme-card theme-shadow theme-border border"
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {TAB_DATA.find((t) => t.id === tab)?.content}
        </motion.div>
      </div>

      {/* CSS变量 */}
      <style jsx global>{`
        /* 浅色主题 */
        .light-theme {
          --color-primary: #3b82f6;
          --color-secondary: #64748b;
          --color-accent: #f59e0b;
          --color-text: #0f172a;
          --color-muted: #6b7280;
          --color-bg: #ffffff;
          --color-card-bg: #f8fafc;
          --color-border: #e6eef8;
          --color-divider: #e6eef8;
          --shadow: 0 4px 10px rgba(16, 24, 40, 0.06);
        }

        /* 深色主题 */
        .dark-theme {
          --color-primary: #60a5fa;
          --color-secondary: #94a3b8;
          --color-accent: #fbbf24;
          --color-text: #e6eef8;
          --color-muted: #94a3b8;
          --color-bg: #0b1220;
          --color-card-bg: #0f172a;
          --color-border: #243240;
          --color-divider: #243240;
          --shadow: 0 6px 18px rgba(2, 6, 23, 0.5);
        }

        /* 应用CSS变量的工具类 */
        .theme-text {
          color: var(--color-text);
        }
        .theme-primary {
          color: var(--color-primary);
        }
        .theme-secondary {
          color: var(--color-secondary);
        }
        .theme-accent {
          color: var(--color-accent);
        }
        .theme-muted {
          color: var(--color-muted);
        }
        .theme-bg {
          background-color: var(--color-bg);
        }
        .theme-card {
          background-color: var(--color-card-bg);
        }
        .theme-border {
          border-color: var(--color-border);
        }
        .theme-divider {
          background-color: var(--color-divider);
        }
        .theme-shadow {
          box-shadow: var(--shadow);
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
