const LandingWhy = () => {
  return (
    <div className="w-full mt-8 text-center text-[#2e3d49]">
      <h2 className="text-[26px] md:text-[33px] mb-8">
        Why should you <span className="text-blue-500" style={{ cursor: "pointer" }} >Join us?</span>
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-16 bg-[#edf1ff] px-4 py-12 text-left">
        <div className="w-full md:w-1/2 max-h-[850px] overflow-hidden flex justify-center">
          <img src="/assets/OBJECTS.svg" alt="Join illustration" className="w-full h-auto max-h-[800px]" />
        </div>

        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h3 className="text-[20px] md:text-[26px] text-gray-700 mb-2 font-semibold">Interactive Learning</h3>
            <p className="text-[15px] md:text-[22px] text-gray-600">
              Dive into a dynamic learning environment with live discussions and peer-to-peer Q&A.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] md:text-[26px] text-gray-700 mb-2 font-semibold">Collaborative Growth</h3>
            <p className="text-[15px] md:text-[22px] text-gray-600">
              Grow with a community that supports your educational journey and motivates progress.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] md:text-[26px] text-gray-700 mb-2 font-semibold">Seamless Access</h3>
            <p className="text-[15px] md:text-[22px] text-gray-600">
              Learn on the go — our platform is built for easy access anytime, anywhere.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] md:text-[26px] text-gray-700 mb-2 font-semibold">Empowered Discovery</h3>
            <p className="text-[15px] md:text-[22px] text-gray-600">
              Explore diverse topics with ease and gain meaningful insights from real learners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingWhy;
