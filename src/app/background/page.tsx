"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "@/styles/background.module.scss";

const Page = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    /** lenis : 스크롤 부드럽게 해주는 기능 */
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

    gsap.timeline({
      scrollTrigger: {
        trigger: ".bg_area",
        start: "top top",
        end: "bottom bottom",
        endTrigger: ".contents_area",
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          gsap.to(div[0], { opacity: 1, duration: 0.7 });
        },
      },
    });

    gsap.utils.toArray(".cont").forEach((box, index) => {
      ScrollTrigger.create({
        trigger: box as HTMLDivElement,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => {
          gsap.to(div[index], { opacity: 1, zIndex: 1, duration: 0.7 });
        },
        onLeaveBack: () => {
          gsap.to(div[index], { opacity: 0, zIndex: 0, duration: 0.7 });
        },
        markers: true,
      });
    });
  }, []);

  return (
    <div>
      <div className={`bg_area`}>
        <div className={`box ${styles.red} ${styles.box}`}></div>
        <div className={`box ${styles.orange} ${styles.box}`}></div>
        <div className={`box ${styles.yellow} ${styles.box}`}></div>
        <div className={`box ${styles.green} ${styles.box}`}></div>
      </div>
      <div className={`contents_area ${styles.contents_area}`}>
        <div className={`cont ${styles.cont}`}>SECTION 01</div>
        <div className={`cont ${styles.cont}`}>SECTION 02</div>
        <div className={`cont ${styles.cont}`}>SECTION 03</div>
        <div className={`cont ${styles.cont}`}>SECTION 04</div>
      </div>
    </div>
  );
};

export default Page;
