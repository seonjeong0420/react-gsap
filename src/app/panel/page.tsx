import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      {/* panel 스크롤 시 순차적으로 show
      text.forEach((param) => {
        gsap.fromTo(
          param,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: param,
              start: "top bottom",
              end: "bottom-=20% top",
              toggleActions: "play reverse play reverse",
              markers: true,
            },
          }
        );
      }); */}
    </div>
  );
};

export default page;
