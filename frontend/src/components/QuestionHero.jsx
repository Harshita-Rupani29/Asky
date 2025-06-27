import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const QuestionsHero = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const onSearchHandler = () => {
    onSearch(query);
    setQuery("");
  };

  return (
    <div
      className="w-full flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/mask-group.svg')" }}
    >
      <div className="pt-12 md:pt-16 h-[370px] md:h-[460px] flex flex-col items-center justify-start">
        <h1 className="text-white text-[25px] md:text-[38px] font-medium text-center leading-[45px] mb-2">
          Cross the Bridge to Educational <br />
          Enlightenment
        </h1>
        <h4 className="text-white text-[17px] md:text-[23px] font-normal text-center mb-14 px-2">
          Building Connections, Bridging Knowledge Gaps
        </h4>

        <div className="relative w-[90%] max-w-[900px] min-w-[350px] md:w-[490px] lg:w-[690px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for questions..."
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchHandler(query);
            }}
            className="w-full py-[18px] px-5 rounded-md outline-none text-[18px] placeholder:text-[22px]"
          />
          <div
            onClick={() => onSearchHandler(query)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-[24px] text-gray-600"
          >
            <RiSearchLine />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsHero;
