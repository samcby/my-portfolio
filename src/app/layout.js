import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";
import { Manrope, Space_Grotesk } from "next/font/google";

const bodyFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sam Chen | IC Design and EDA Portfolio",
    template: "%s | Sam Chen",
  },
  description:
    "Portfolio of Sam Chen, an IC design and EDA-focused engineer building research-driven hardware, analog/mixed-signal, and computer architecture projects.",
  keywords: [
    "Sam Chen",
    "portfolio",
    "IC design",
    "EDA",
    "hardware acceleration",
    "computer architecture",
    "UCLA",
    "microelectronics",
  ],
  openGraph: {
    title: "Sam Chen | IC Design and EDA Portfolio",
    description:
      "Research, projects, and contact information for Sam Chen's portfolio.",
    url: "/",
    siteName: "Sam Chen Portfolio",
    images: [
      {
        url: "/images/Sam_logo_vaporwave.png",
        width: 512,
        height: 512,
        alt: "Sam Chen portfolio logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Chen | IC Design and EDA Portfolio",
    description:
      "Explore Sam Chen's IC design, EDA, and hardware acceleration portfolio.",
    images: ["/images/Sam_logo_vaporwave.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const noFlashStyle = `
  .no-flash {
    visibility: hidden;
  }
  html.dark {
    background: #0b1220;
    color-scheme: dark;
  }
  html.light {
    background: #ffffff;
    color-scheme: light;
  }
`;

const themeScript = `
  (function() {
    let html = document.documentElement;
    html.classList.add('no-flash');

    function setTheme(theme) {
      html.classList.remove('light', 'dark');
      html.classList.add(theme);
    }

    let savedTheme = localStorage.getItem('theme');
    let userChoice = localStorage.getItem('userThemeChoice');

    if (savedTheme && userChoice === 'true') {
      setTheme(savedTheme);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      localStorage.removeItem('theme');
      localStorage.removeItem('userThemeChoice');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('userThemeChoice') !== 'true') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    requestAnimationFrame(() => {
      html.classList.remove('no-flash');
    });
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: noFlashStyle }} />
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col bg-[var(--page-bg)] transition-colors duration-300">
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <Navbar />
            <main
              id="main-content"
              className="flex-grow transition-colors duration-300"
            >
              {children}
            </main>
            <Footer />
            <CustomCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
