"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "@/styles/backgroundpin.module.scss";
import { useGSAP } from "@gsap/react";

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const scrollYRef = useRef(0); // 최신 scrollY 값을 추적하기 위한 ref

  useEffect(() => {
    const footer = document.querySelector(".footer") as HTMLElement;
    const contents_area = document.querySelector(".contents_area") as HTMLElement;

    if (!footer || !contents_area) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = contents_area.clientHeight - footer.clientHeight * 4;

      if (currentScrollY > threshold) {
        setScrollY(currentScrollY);
        scrollYRef.current = currentScrollY; // ref를 통해 최신 scrollY 유지
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // 이벤트 정리
    };
  }, []);

  return scrollY;
};

const Page = () => {
  gsap.registerPlugin(ScrollTrigger);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollPosition();

  useEffect(() => {
    const footer = document.querySelector(".footer") as HTMLElement;

    const lenis = new Lenis({
      duration: 1.2,
      // duration: 2.5, // ⬅ 기존보다 더 길게 설정
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
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
        endTrigger: ".endTrigger",
        pin: true,
        toggleActions: "play play play reverse",
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
        onLeaveBack: () => {
          if (index === 0) {
            gsap.to(".background", {
              opacity: 0,
            });
          }
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
          .add("label")
          .to(sceneInner.querySelector(".box_content"), { opacity: 0, y: -50 }, "+=3")
          .to(sceneInner.querySelector(".box_heading"), { opacity: 0, y: -50 });

        // gsap scroll container
        gsapScroll(ScrollTrigger.getById(`scene-${index}`)?.start, item);
      }
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: () => {
            return footer ? `${scrollY - footer.clientHeight} top` : "top top"; // 안전한 접근
          },
          end: "bottom top", // 하단이 뷰포트의 20% 위치에 있을 때 끝남
          invalidateOnRefresh: true, // 새로고침할 때 높이 재계산
          toggleActions: "play play play reverse",
        },
      })
      .to(".background", { opacity: 0 });
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
          },
        })
        .to(".scrollbasic__container", { opacity: 1 })
        .to(".scrollbasic__container", { y: `-${scrollheight + 50}` });
    }
  };

  useGSAP(() => {
    const textArray = gsap.utils.toArray<HTMLElement>(".scrollscale__text");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".scrollscale",
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: "+=500%",
        scrub: 0.5,
      },
    });
    timeline
      .to(".scrollscale__heading", { y: -100, opacity: 0 })
      .to(".scrollscale__video", 3, { scale: 0.7, borderRadius: 50 })
      .to(".scrollscale__textbox", 2, { opacity: 1, backgroundColor: "#641875" })
      .to(textArray, 5, { opacity: 1, stagger: 5 }, "+=2")
      .to(".scrollscale__text", 2, { opacity: 0, y: -10 })
      .to(".scrollscale__textbox", { opacity: 1, backgroundColor: "#641875" }, "+=5");
  });

  return (
    <div>
      <section className={`scrollscale ${styles.scrollscale}`}>
        <h1 className={`scrollscale__heading`}>HEADING TEXT 1</h1>
        <div className={`${styles.scrollscale__video} scrollscale__video`}>
          <img src="https://dummyimage.com/000/fff" alt="더미 이미지" />
        </div>
        <div className={`${styles.scrollscale__textbox} scrollscale__textbox`}>
          <div className={`scrollscale__text ${styles.scrollscale__text}`}>TEST1</div>
          <div className={`scrollscale__text ${styles.scrollscale__text}`}>TEST2</div>
          <div className={`scrollscale__text ${styles.scrollscale__text}`}>TEST3</div>
        </div>
      </section>

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

      <div
        className={`endTrigger`}
        style={{
          position: "relative",
          zIndex: "1",
          height: "100vh",
          backgroundColor: "antiquewhite",
        }}
      ></div>

      <footer className={`footer ${styles.footer}`}>
        <h2 className={`text1`}>footer</h2>
        <p className={`text2`}>footer DESC</p>
      </footer>
    </div>
  );
};

export default Page;
