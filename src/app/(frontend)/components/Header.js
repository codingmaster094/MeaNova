"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OffCanvas from "./OffCanvas";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "@studio-freight/lenis";

const Header = ({ HeaderData, MenusData }) => {

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Handle navigation with hash/section scrolling
    const handleNavClick = (e, menuUrl, target) => {
        // Check if the URL contains a hash/section ID
        if (menuUrl.includes('#')) {
            e.preventDefault();
            
            const [path, hash] = menuUrl.split('#');
            const targetPath = path || '/';
            
            // If we're already on the target page, just scroll
            if (pathname === targetPath) {
                scrollToSection(hash);
            } else {
                // Navigate to home page first, then scroll
                router.push(targetPath);
                // Wait for navigation to complete before scrolling
                setTimeout(() => {
                    scrollToSection(hash);
                }, 100);
            }
        }
        // For external links or links with _blank target, let default behavior work
    };

    // Scroll to section helper function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100; // Adjust for sticky header height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update URL with hash
            window.history.pushState(null, '', `#${sectionId}`);
        }
    };

    // Handle hash on page load
    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            setTimeout(() => {
                scrollToSection(hash);
            }, 300);
        }
    }, [pathname]);

//       useEffect(() => {
//     const lenis = new Lenis();

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//     window.lenis = lenis;

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

    return (
        <>
            <header className='py-31 sticky top-0 bg-white z-[99]'>
                <div className='container'>
                    <div className='flex justify-between items-center gap-50'>
                        <Link href="/" aria-roledescription='link'>
                            <Image
                                className="w-100 xl:w-135"
                                src={HeaderData.Header_Logo.url}
                                alt="Firmenlogo von Company Name"
                                role="img"
                                width={200}
                                height={60}
                                fetchPriority="high"
                            />
                        </Link>

                        <nav id="menu"
                            className="xl:block hidden"
                            role="navigation"
                            aria-label="menü">
                            <ul className='flex justify-center items-center gap-48 [&_li>a]:text-primary [&_li>a]:font-outfit [&_li>a]:text-base font-light'>
                                {MenusData.menus.map((menu, index) => {
                                    const menuUrl = menu.link?.url || "/";
                                    const isActive =
                                        pathname === menuUrl ||
                                        (menuUrl !== "/" && pathname.startsWith(menuUrl));

                                    return (
                                        <li key={index}>
                                            <Link
                                                href={menuUrl}
                                                aria-label={menu.link?.label || ""}
                                                aria-roledescription='link'
                                                target={menu.link?.target || "_self"}
                                                onClick={(e) => handleNavClick(e, menuUrl, menu.link?.target)}
                                                className={`${isActive
                                                        ? "active"
                                                        : "text-primary"
                                                    } transition-all duration-200`}
                                            >
                                                {menu.link?.label}
                                            </Link>
                                        </li>
                                    )
                                })}

                            </ul>
                        </nav>
                        <div className="flex justify-end items-center gap-16 md:gap-24">
                            <Link 
                            href={HeaderData.link.url}
                           target={HeaderData.link.target}
                            aria-label="Kontaktieren Sie uns – Startseite"
                             className='btn-dark !hidden sm:!block'>
                                <span>{HeaderData.link.Kontakt_label}</span>
                            </Link>
                          
                            <Link href={HeaderData.link.url}
                           target={HeaderData.link.target} aria-label="Kontaktieren Sie uns – Startseite" className='bg-black p-4 rounded-sm !block sm:!hidden'>
                                <Image src="/images/phone.svg"
                                alt="phone icon"
                                role="img"
                                width={50}
                                height={50}
                                className="w-30 h-30 block sm:hidden"/>
                               
                            </Link>
                            {/* Mobile Menu Button */}
                            <button
                                id="menu-btn"
                                className="xl:hidden block cursor-pointer"
                                aria-label="Toggle menu"
                                onClick={() => setIsOpen(true)}
                            >
                                <Image
                                    src="/images/menu-btn.svg"
                                    alt="Menu button"
                                    role="img"
                                    width={50}
                                    height={50}
                                    className="w-40 h-40"
                                />
                            </button>

                        </div>
                    </div>
                </div>
            </header>

            {/* OffCanvas Menu */}
            <OffCanvas logo={HeaderData.Header_Logo.url} menus={MenusData.menus} isOpen={isOpen} onClose={() => setIsOpen(false)} handleNavClick={handleNavClick} />
        </>
    )
}

export default Header