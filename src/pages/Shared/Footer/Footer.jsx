import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-white font-inter" data-aos="fade-up" data-aos-animation="1500">
      <div className="flex md:flex-row flex-col font-medium text-gray-400">
        <div
          className="bg-[#1F2937] md:w-1/2 flex flex-col items-center p-12 space-y-1 text-sm md:text-base"
        >
          <h3>Contact us</h3>
          <p>+88 123456789</p>
          <p>Mon - Fri: 08:00 - 22:00</p>
          <p>Sat - Sun: 10:00 - 23:00</p>
          <p>123 New Colony Street, Bangladesh</p>
        </div>
        <div
          className="bg-[#111827] md:w-1/2 flex flex-col items-center p-12 space-y-2"
        >
          <h3>Follow Us</h3>
          <p>Join on social media</p>
          <div className="flex space-x-3">
            <FaFacebook className="text-3xl cursor-pointer"></FaFacebook>
            <FaInstagram className="text-3xl cursor-pointer"></FaInstagram>
            <FaX className="text-3xl cursor-pointer"></FaX>
          </div>
        </div>
      </div>
      <p className="bg-[#151515] text-center p-4 text-gray-400 font-bold">
        Developed by -{" "}
        <a
          href="https://github.com/mohasin-hossain"
          target="_blank"
          className="link-warning"
        >
          Md. Mohasin Hossain
        </a>
      </p>
    </footer>
  );
};

export default Footer;
