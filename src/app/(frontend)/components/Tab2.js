"use client";

import Image from "next/image";
import React, { useState , useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Lenis from "@studio-freight/lenis";
const Tab2 = ({ data }) => {
  const [mainTab, setMainTab] = useState(0);
   const lenisRef = useRef(null);

  useEffect(() => {
    const scroller = new Lenis({
      duration: 1.2, // speed of scroll
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenisRef.current = scroller;

    return () => {
      scroller.destroy();
    };
  }, []);

  // ✅ Smooth scroll handler for internal section links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetEl = document.querySelector(targetId);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, {
        offset: -80, // adjust for sticky header height
        duration: 1.2,
      });
    }// close off-canvas if open
  };
  useEffect(() => {
    const equalizeHeights = () => {
      if (window.innerWidth < 768) return; // Skip for mobile

      // For each swiper instance on the page
      document.querySelectorAll(".swiper").forEach((swiperEl) => {
        const titles = swiperEl.querySelectorAll(".js-title");
        const texts = swiperEl.querySelectorAll(".js-content");

        // Reset first
        titles.forEach(el => (el.style.minHeight = ""));
        texts.forEach(el => (el.style.minHeight = ""));

        // Calculate max heights
        let maxTitle = 0;
        let maxText = 0;

        titles.forEach(el => (maxTitle = Math.max(maxTitle, el.offsetHeight)));
        texts.forEach(el => (maxText = Math.max(maxText, el.offsetHeight)));

        // Apply equal height
        titles.forEach(el => (el.style.minHeight = `${maxTitle}px`));
        texts.forEach(el => (el.style.minHeight = `${maxText}px`));
      });
    };

    equalizeHeights();
    window.addEventListener("resize", equalizeHeights);
    return () => window.removeEventListener("resize", equalizeHeights);
  }, [mainTab]);

  if (!data || !Array.isArray(data.link_title)) return null;

  return (
    <section className="py-80 xl:min-h-screen bg-gray-50" id="personalvermittlung">
      <div className="max-w-1570 mx-auto">
        {/* ===== MAIN TABS ===== */}
        <div className="flex justify-center gap-24 mb-64">
          {data.link_title.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setMainTab(idx)}
              className={`px-12 sm:px-32 py-12 border border-black font-medium cursor-pointer ${mainTab === idx ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
              {tab?.title?.label}
            </button>
          ))}
        </div>

        {/* ===== ACTIVE MAIN TAB CONTENT ===== */}
        {data.link_title.map((main, mainIdx) =>
          mainIdx === mainTab ? (
            <div key={mainIdx} className="space-y-96">
              {/* <h2 className="text-h2/snug font-semibold text-center">
                {main?.title?.label}
              </h2> */}

              {/* Loop through all subtabs (render vertically) */}
              {main.sub_title?.map((sub, subIdx) => (
                <div key={subIdx} className="space-y-64">
                  {sub.links?.map((linkItem, linkIdx) => {
                    const sliderItems = linkItem?.slider?.[0]?.["Slider Item"] || [];
                    const ctaItems = linkItem?.slider?.[0]?.["CTA Item"] || [];

                    return (
                      <div key={linkIdx} className="space-y-48">
                        {linkItem.sliderHeading && (
                          <h3 className="text-h3 font-medium text-center px-16">
                            {linkItem.sliderHeading}
                          </h3>
                        )}

                        {/* Swiper Section */}
                        {sliderItems.length > 0 && (
                          <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            loop={true}
                            autoplay={{ delay: 4500 }}
                            navigation={true}
                            pagination={{
                              clickable: true,
                              enabled: true,
                            }}
                            slidesPerView={1}
                            spaceBetween={64}
                            breakpoints={{
                             1366: { slidesPerView: 3, spaceBetween: 64, pagination: { enabled: false } },
                              1200: { slidesPerView: 3, spaceBetween: 64, pagination: { enabled: false } },
                              768: { slidesPerView: 2, spaceBetween: 32, pagination: { enabled: false } },
                              640: { slidesPerView: 1, spaceBetween: 32, pagination: { enabled: true } },
                            }}
                            className="my-32 !px-32 xl:!px-60"
                          >
                            {sliderItems.map((item, index) => (
                              <SwiperSlide key={index} className="!h-auto">
                                <div className="bg-primary_1 text-white rounded shadow-md h-full flex flex-col p-32 relative border-5 border-solid border-primary_1">
                                  <div className="h-full flex flex-col justify-between flex-grow">
                                    {item.sliderImage?.url && (
                                      <Image
                                        src={item.sliderImage.url}
                                        alt={item.sliderImage?.alt || "slider image"}
                                        width={48}
                                        height={48}
                                        className="w-48 h-48 mb-32 md:mb-80"
                                      />
                                    )}
                                    <div className="flex flex-col flex-grow">
                                      <h3 className="font-normal font-jakarta text-h3/snug mb-24 js-title">
                                        {item.Heading}
                                      </h3>
                                      {item.richText?.root?.children &&
                                        item.richText?.root?.children.map((block, index) => {
                                            if (block.type === "list") {
                                                return (
                                                    <ul key={index} className="leading-snug pl-24 [&_li]:list-disc space-y-16">
                                                        {block.children.map((item, i) => (
                                                            <li key={i}>
                                                                {item.children[0].text}
                                                            </li>
                                                        ))}
                                                    </ul>   
                                                );
                                            } else if (block.type === "paragraph") {
                                                return (

                                                    <p key={index} className="text-base txt-body js-content">
                                                        {block.children.map((child) => child.text).join(" ")}
                                                    </p>

                                                );
                                            } else if (block.type === "heading") {
                                                return (
                                                    <h3
                                                        key={index}
                                                        className="text-h3 font-medium text-center px-16"
                                                        dangerouslySetInnerHTML={{ __html: block.children.map((child) => child.text).join(" ") }}
                                                    ></h3>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                  </div>
                                  <div className="box w-100 h-100 bg-white flex justify-center items-center ml-auto -mr-32 -mb-32">
                                    <span className="font-jakarta font-medium text-4xl text-black">
                                      {index + 1}
                                    </span>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        )}

                        {/* CTA Section */}
                        <div className="container">
                          {ctaItems.length > 0 && (
                          <div className="p-32 my-64 space-y-24 text-center">
                            {ctaItems.map((cta, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-24">
                                <h2 className="text-h2/snug text-center">{cta.CTAHeading}</h2>
                                <div className="line max-w-225 w-full border-1 border-solid border-grey1"></div>
                                {cta.richText?.root?.children &&
                                        cta.richText?.root?.children.map((block, index) => {
                                            if (block.type === "list") {
                                                return (
                                                    <ul key={index} className="leading-snug pl-24 [&_li]:list-disc space-y-16">
                                                        {block.children.map((item, i) => (
                                                            <li key={i}>
                                                                {item.children[0].text}
                                                            </li>
                                                        ))}
                                                    </ul>   
                                                );
                                            } else if (block.type === "paragraph") {
                                                return (

                                                    <p key={index}>
                                                        {block.children.map((child) => child.text).join(" ")}
                                                    </p>

                                                );
                                            } else if (block.type === "heading") {
                                                return (
                                                    <h3
                                                        key={index}
                                                        className="text-h3 font-medium text-center px-16"
                                                        dangerouslySetInnerHTML={{ __html: block.children.map((child) => child.text).join(" ") }}
                                                    ></h3>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                {cta.CTA_link && (
                                  <Link
                                    href={cta.CTA_link.url}
                                    onClick={(e) => handleSmoothScroll(e, cta.CTA_link.url)}
                                    target={cta.CTA_link.target}
                                    className="inline-block px-24 py-12 bg-black text-white hover:bg-gray-800 transition"
                                  >
                                    {cta.CTA_link.label}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        </div>
                        
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default Tab2;
