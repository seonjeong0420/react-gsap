"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "@/styles/test.module.scss";
import { useRef } from "react";

const Page = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const container = useRef<HTMLDivElement>(null);
  const container2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".box_section",
          start: "top top",
          end: "bottom top",
          scrub: true, // 되돌리기 기능
          pin: true,
          pinSpacing: false,
        },
      });
      timeline
        .to(".heading", { y: -100, opacity: 0 })
        .to(".video", { scale: 0.7, borderRadius: 50 })
        .to(".box", { opacity: 1 })
        .to(".test1", { opacity: 1, y: 0 })
        .to(".test2", { opacity: 1, y: 0 })
        .to(".test3", { opacity: 1, y: 0 })
        .to(".test", { opacity: 0, y: -10 })
        .set("body", { delay: 3 }, 2);
    },
    { scope: container }
  );

  return (
    <div className={styles.pagemain}>
      <div ref={container}>
        <section className={`box_section ${styles.box_section}`}>
          <article className={styles.articlemain}>
            <h1 className={`heading`}>HEADING TEXT 1</h1>
            <div className={`${styles.video} video`}>VIDEO AREA</div>
            <div className={`${styles.box} box`}>
              <div className={`test1 test ${styles.test}`}>TEST1</div>
              <div className={`test2 test ${styles.test}`}>TEST2</div>
              <div className={`test3 test ${styles.test}`}>TEST3</div>
            </div>
          </article>
        </section>
      </div>

      <div ref={container2}>
        <section className={`box_section2`}>
          <article className={styles.article}>
            <h2>ARTICLE1 HEADING TEXT</h2>
            <div>
              <p>ARTICLE1 ParagraphElement 1</p>
              <p>ARTICLE1 ParagraphElement 2</p>
              <p>ARTICLE1 ParagraphElement 3</p>
            </div>
          </article>
        </section>
      </div>

      <article className={styles.article}>
        <h2>ARTICLE2 HEADING TEXT</h2>
        <div className={(styles.box, styles.box_height60)}>BOX1</div>
        <div className={(styles.box, styles.box_height45)}>BOX2</div>
        <div className={(styles.box, styles.box_height60)}>BOX3</div>
        <div className={(styles.box, styles.box_height60)}>BOX4</div>
      </article>

      <article className={styles.article}>
        <h2>ARTICLE3 HEADING TEXT</h2>
        <div className={styles.box_flip_container}>
          <div className={styles.box_flip}>BOX1</div>
          <div className={styles.box_flip}>BOX2</div>
          <div className={styles.box_flip}>BOX3</div>
          <div className={styles.box_flip}>BOX4</div>
        </div>
      </article>
    </div>
  );
};

export default Page;
