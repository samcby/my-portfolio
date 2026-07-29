"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';

const NavLink = ({ href, title }) => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`block rounded py-2 pl-3 pr-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#268bd2] focus-visible:ring-offset-2 sm:text-xl md:p-0
                 ${isActive 
                   ? isDarkMode 
                     ? 'text-[#93a1a1]' 
                     : 'text-[#002b36]' 
                   : isDarkMode 
                     ? 'text-[#839496] hover:text-[#93a1a1]' 
                     : 'text-[#586e75] hover:text-[#002b36]'}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
