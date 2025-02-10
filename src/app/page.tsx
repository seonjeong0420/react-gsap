"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "@/styles/test.module.scss";

const Page = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

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
      .to(".scrollscale__video", { scale: 0.7, borderRadius: 50 })
      .to(".scrollscale__textbox", { opacity: 1, backgroundColor: "#641875", duration: 2 })
      .to(textArray, { opacity: 1, stagger: 1, delay: 2 })
      .to(".scrollscale__text", { opacity: 0, y: -10, duration: 2 })
      .to(".scrollscale__textbox", { opacity: 1, backgroundColor: "#641875" }, "+=3");
  });

  useGSAP(() => {
    const flip = gsap.utils.toArray<HTMLDivElement>(".box_flip");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".scrollflip",
        start: "top top",
        end: "+=300%", // += 숫자가 커질수록 애니메이션 이벤트가 느려짐
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });
    timeline
      .to(".scrollflip__text", { opacity: 1, y: 0, stagger: 0.2 })
      .to(".flip_container", { opacity: 1 })
      .to(flip, { scale: 0.8, rotate: 30, x: 200, y: -100, stagger: 0.5, opacity: 0 })
      .to(".scrollflip__text", { opacity: 0, y: -10, stagger: 0.2 });
  });

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".scrollbasic",
        endTrigger: ".scrollarticle",
        start: "top top",
        // toggleActions: "play play play reverse",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
    timeline
      .to(".scrollbasic__text", { opacity: 1, y: 0, stagger: 0.2 })
      .to(".scrollbasic__container", { delay: 0.1, opacity: 1, y: 0 })
      .to(".scrollbasic__container", {
        yPercent: `-100`,
      })
      .to(".scrollbasic__text", { opacity: 0, y: -10, stagger: 0.2 });
  });

  return (
    <div className={styles.pagemain}>
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

      <section className={`scrollflip ${styles.scrollflip}`}>
        <div className={`scrollflip__textarea ${styles.scrollflip__textarea}`}>
          <h2 className={`scrollflip__text ${styles.scrollflip__heading}`}>FILP HEADING TEXT</h2>
          <p className={`scrollflip__text ${styles.scrollflip__subheading}`}>paragraph text</p>
        </div>
        <div className={`scrollflip__boxarea ${styles.scrollflip__boxarea}`}>
          <div className={`flip_container ${styles.flip_container}`}>
            <div className={`box_flip ${styles.box_flip}`}>BOX1</div>
            <div className={`box_flip ${styles.box_flip}`}>BOX2</div>
            <div className={`box_flip ${styles.box_flip}`}>BOX3</div>
            <div className={`box_flip ${styles.box_flip}`}>BOX4</div>
          </div>
        </div>
      </section>

      <section className={`scrollbasic ${styles.scrollbasic}`}>
        <div className={`scrollbasic__textarea ${styles.scrollbasic__textarea}`}>
          <h2 className={`scrollbasic__text ${styles.scrollbasic__heading}`}>ARTICLE1 HEADING TEXT</h2>
          <p className={`scrollbasic__text ${styles.scrollbasic__subheading}`}>paragraph text</p>
        </div>
        <div className={`scrollbasic__container ${styles.scrollbasic__container}`}>
          <div className={`${styles.inner}`}>
            <div className={`box_basic ${styles.box_basic}`}>BOX1</div>
            <div className={`box_basic ${styles.box_basic}`}>BOX2</div>
            <div className={`box_basic ${styles.box_basic}`}>BOX3</div>
            <div className={`box_basic ${styles.box_basic}`}>BOX4</div>
          </div>
        </div>
      </section>

      <article className={`scrollarticle ${styles.article}`}>
        <h2>ARTICLE2 HEADING TEXT</h2>
        <div className={(styles.box, styles.box_height60)}>BOX1</div>
        <div className={(styles.box, styles.box_height45)}>BOX2</div>
        <div className={(styles.box, styles.box_height60)}>BOX3</div>
        <div className={(styles.box, styles.box_height60)}>BOX4</div>
      </article>

      <article className={styles.article}>
        <h2>ARTICLE3 HEADING TEXT</h2>
        <div className={styles.flip_container}>
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
