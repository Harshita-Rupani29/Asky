import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { FaTimes, FaClipboard } from "react-icons/fa";
import BackDrop from "./BackDrop";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SharePopup = ({ shareUrl, title, description, toggleSharePopup }) => {
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("URL copied to clipboard");
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
          toast.error("Copy to clipboard failed. Please copy manually.");
        });
    }
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    toggleSharePopup();
  };

  return (
    <BackDrop onClick={toggleSharePopup}>
      <div
        className="bg-white p-6 rounded-lg text-center relative mx-4 max-w-[500px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Share This Question</h3>
          <button
            className="absolute top-3 right-3 text-gray-700 hover:text-black"
            onClick={handleCloseClick}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex justify-center flex-wrap gap-4 mt-5 px-2">
          <EmailShareButton url={shareUrl} subject={title} body={description}>
            <EmailIcon size={48} round />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl} title={title} summary={description}>
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={48} round />
          </TelegramShareButton>
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center hover:text-blue-600 transition-all sm:block hidden"
          >
            <FaClipboard size={48} />
          </button>
        </div>
      </div>
    </BackDrop>
  );
};

export default SharePopup;
