'use client'
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BioHead from "./BioHead";


interface Card {
  idx: number;
  pos: number;
  src: string;
  head: string;
  desc: string;
  active: boolean;
}

const Carousel: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      idx: 1,
      pos: 1,
      src: "/images/about1.png",
      head: "Pictures from Indonesia",
      desc: "Raskoda is a software development company that provides comprehensive services in the field of software and technology. Raskoda is a comprehensive software development company in the field of software and technology.",
      active: true,
    },
    {
      idx: 2,
      pos: 2,
      src: "/images/about2.png",
      head: "Pictures from Spain",
      desc: "Raskoda is a software development company that provides comprehensive services in the field of software and technology. Raskoda is a comprehensive software development company in the field of software and technology.",
      active: true,
    },
    {
      idx: 3,
      pos: 3,
      src: "/images/about1.png",
      head: "Pictures from India",
      desc: "Raskoda is a software development company that provides comprehensive services in the field of software and technology. Raskoda is a comprehensive software development company in the field of software and technology.",
      active: false,
    },
    {
      idx: 4,
      pos: 4,
      src: "/images/about2.png",
      head: "Pictures from Italy",
      desc: "Raskoda is a software development company that provides comprehensive services in the field of software and technology. Raskoda is a comprehensive software development company in the field of software and technology.",
      active: false,
    },
    {
      idx: 5,
      pos: 5,
      src: "/images/about1.png",
      head: "Pictures from Iraq",
      desc: "Raskoda is a software development company that provides comprehensive services in the field of software and technology. Raskoda is a comprehensive software development company in the field of software and technology.",
      active: false,
    },
  ]);

  const handleLeftClick = () => {
    const prevState = [...cards];
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))[0].idx;
    prevState.find((f) => f.active === false)!.active = true;
    prevState.find((f) => f.idx === nextCardIdx)!.active = false;
    prevState.find((f) => f.idx === nextCardIdx)!.pos =
      Math.max(...prevState.map((o) => o.pos)) + 1;
    setCards(prevState);
  };

  const handleRightClick = () => {
    const prevState = [...cards];
    const nextCardIdx = prevState
      .filter((ft) => ft.active === true)
      .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
      .pop()!.idx;
    prevState.find((f) => f.active === false)!.pos =
      Math.min(...prevState.map((o) => o.pos)) - 1;
    prevState.find((f) => f.active === false)!.active = true;
    prevState.find((f) => f.idx === nextCardIdx)!.active = false;
    setCards(prevState);
  };

  const [editable, setEditable] = useState<boolean>(false);
  const handleClick = () => {
    setEditable(!editable);
  };
  const t = useTranslations("whoWeAre4");

  return (
    <div className="bg-secondColor pb-8">
      <BioHead button={t("label")} headLine={t("head")} summary={t("paragraph")} bg="bg-secondColor" />

      <div className="flex flex-col items-center md:flex-row ps-5 md:ps-0 md:justify-evenly gap-3">
        {cards
          .filter((f) => f.active === true)
          .sort((a, b) => (a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0))
          .map((card, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center self-stretch p-2 text-start bg-white rounded-2xl border border-gray border-solid w-[330px] lg:w-[660px] max-md:px-5"
              >
                <Image alt="lazy" src={card.src} width={700} height={600} />
                <div className="mt-8 text-xl font-medium leading-5 text-gray-900 max-md:max-w-full">
                  {card.head}
                </div>
                <div className="mt-5 text-base leading-6 text-zinc-500 max-md:max-w-full">
                  {card.desc}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between px-10 relative -top-80 items-center ">
        <div
          className="text-xl md:text-5xl cursor-pointer flex flex-row text-white"
          onClick={handleLeftClick}
        >
          {"<"}
        </div>
        <div
          className="text-xl md:text-5xl cursor-pointer text-white"
          onClick={handleRightClick}
        >
          {">"}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
