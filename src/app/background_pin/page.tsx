"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "@/styles/backgroundpin.module.scss";

const Page = () => {
  gsap.registerPlugin(ScrollTrigger);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // duration: 2.5, // ⬅ 기존보다 더 길게 설정
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    /** bgColor */
    const bgColor = ["#256dda", "#fb6250", "#191f28", "#8059e3"];
    const scenes = gsap.utils.toArray(".scene") as HTMLDivElement[];
    scenes.forEach((items, index) => {
      const item = items as HTMLDivElement;

      ScrollTrigger.create({
        trigger: item,
        start: "top top",
        // end: () => `+=${item.offsetHeight}`, // 각 씬의 높이를 기준으로 끝나는 위치 설정
        end: () => `+=${item.offsetHeight * 5}`, // ⬅ 기존보다 더 길게 설정
        pin: true,
        onEnter: () => {
          gsap.to(".background", {
            opacity: 1,
            backgroundColor: bgColor[index],
          });
        },
        onEnterBack: () => {
          gsap.to(".background", {
            opacity: 1,
            backgroundColor: bgColor[index],
          });
        },
        onLeave: () => {
          gsap.to(".background", {
            opacity: 1,
            backgroundColor: bgColor[index + 1],
          });
        },
        onLeaveBack: () => {
          gsap.to(".background", {
            opacity: 1,
            backgroundColor: bgColor[index - 1],
          });
        },
      });

      const sceneInner = item.querySelector(".scene_inner") as HTMLDivElement;

      if (sceneInner) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sceneInner,
              start: () => ScrollTrigger.getById(`scene-${index}`)?.start || "top top",
              end: () => `+=${item.offsetHeight * 5}`, // ⬅ 기존보다 더 길게 설정
              scrub: true,
            },
          })
          .fromTo(sceneInner.querySelector(".heading_text"), { opacity: 0, y: 50, duration: 0.1 }, { opacity: 1, y: 0, duration: 0.1 })
          .fromTo(sceneInner.querySelector(".heading_desc"), { opacity: 0, y: 50, duration: 0.1 }, { opacity: 1, y: 0, duration: 0.1 })
          .fromTo(sceneInner.querySelector(".box_content"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.1 })
          .to(sceneInner.querySelector(".box_content"), { opacity: 0, y: -50 }, "+=3")
          .to(sceneInner.querySelector(".box_heading"), { opacity: 0, y: -50 });

        // gsap scroll container
        gsapScroll(ScrollTrigger.getById(`scene-${index}`)?.start, item);
      }
    });
  }, []);

  const gsapScroll = (param, paramInner) => {
    const scrollheight = document.getElementById("scene-1")?.offsetHeight || 0;
    if (scrollheight) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".scrollbasic__container",
            start: () => param || "top top",
            end: `${paramInner.offsetHeight * 4.5} top`,
            scrub: true,
            invalidateOnRefresh: true,
            markers: true,
          },
        })
        .to(".scrollbasic__container", { opacity: 1, y: 0 })
        .to(".scrollbasic__container", { y: `-${scrollheight + 50}` });
    }
  };

  return (
    <div>
      <div className={`background ${styles.background}`} ref={backgroundRef}></div>
      <div className={`contents_area ${styles.contents_area}`}>
        <div className={`scene ${styles.scene}`}>
          <div id="scene-0" className={`scene_inner scene_inner_01 ${styles.scene_inner}`}>
            <div className={`box_heading ${styles.box_heading}`}>
              <h2 className={`heading_text ${styles.heading_text}`}>SECTION 01</h2>
              <p className={`heading_desc ${styles.heading_desc}`}>section description</p>
            </div>
            <div className={`box_content ${styles.box_content}`}>
              <div>BOX</div>
            </div>
          </div>
        </div>
        <div className={`scene ${styles.scene}`}>
          <div id="scene-1" className={`scene_inner scene_inner_02 ${styles.scene_inner}`}>
            <div className={`box_heading ${styles.box_heading}`}>
              <h2 className={`heading_text ${styles.heading_text}`}>SECTION 02</h2>
              <p className={`heading_desc ${styles.heading_desc}`}>section description</p>
            </div>
            <div className={`box_content ${styles.box_content}`}>
              <div className={`scrollbasic__container ${styles.scrollbasic__container}`}>
                <div className={`box_basic ${styles.box_basic}`}>BOX1</div>
                <div className={`box_basic ${styles.box_basic}`}>BOX2</div>
                <div className={`box_basic ${styles.box_basic}`}>BOX3</div>
                <div className={`box_basic ${styles.box_basic}`}>BOX4</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`scene ${styles.scene}`}>
          <div className={`scene_inner scene_inner_03 ${styles.scene_inner}`}>
            <div className={`box_heading ${styles.box_heading}`}>
              <h2 className={`heading_text ${styles.heading_text}`}>SECTION 03</h2>
              <p className={`heading_desc ${styles.heading_desc}`}>section description</p>
            </div>
            <div className={`box_content ${styles.box_content}`}>
              <div>BOX</div>
            </div>
          </div>
        </div>
        <div className={`scene ${styles.scene}`}>
          <div className={`scene_inner scene_inner_04 ${styles.scene_inner}`}>
            <div className={`box_heading ${styles.box_heading}`}>
              <h2 className={`heading_text ${styles.heading_text}`}>SECTION 04</h2>
              <p className={`heading_desc ${styles.heading_desc}`}>section description</p>
            </div>
            <div className={`box_content ${styles.box_content}`}>
              <div>BOX</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
