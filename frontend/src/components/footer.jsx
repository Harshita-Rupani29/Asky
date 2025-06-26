const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center p-6 text-center text-sm text-gray-700">
      <div className="mb-3">
        
        {/* <img src="/assets/logo.svg" alt="Logo" className="h-10" /> */}
      </div>
      <ul className="flex gap-4 text-[15px] font-medium mb-2">
        <li className="hover:underline cursor-pointer">Contact Us</li>
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">FAQ</li>
      </ul>
      <h5 className="text-[13px] font-normal tracking-widest mt-1">
        © 2025 Harshita-Rupani
      </h5>
    </footer>
  );
};

export default Footer;
