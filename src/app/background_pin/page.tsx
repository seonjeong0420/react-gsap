"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "@/styles/background.module.scss";

const Page = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const div = document.querySelectorAll(".box");
    gsap.set(div, { zIndex: 0, opacity: 0 });
    gsap.set(div[0], { opacity: 1, zIndex: 1 });

    const bgColor = ["#ddd", "blue", "green", "pink"];
    gsap.utils.toArray(".cont").forEach((box, index) => {
      ScrollTrigger.create({
        trigger: box as HTMLDivElement,
        start: "top top",
        end: "bottom top",
        pin: true,
        onEnter: () => {
          gsap.to(box as HTMLDivElement, { opacity: 1, zIndex: 1, duration: 0.7, backgroundColor: bgColor[index] });
        },
        onLeaveBack: () => {
          gsap.to(box as HTMLDivElement, { opacity: 0, zIndex: 0, duration: 0.7 });
        },
      });
    });
  }, []);

  return (
    <div className={`contents_area ${styles.contents_area}`}>
      <div className={`cont ${styles.cont}`}>SECTION 01</div>
      <div className={`cont ${styles.cont}`}>SECTION 02</div>
      <div className={`cont ${styles.cont}`}>SECTION 03</div>
      <div className={`cont ${styles.cont}`}>SECTION 04</div>
    </div>
  );
};

export default Page;
