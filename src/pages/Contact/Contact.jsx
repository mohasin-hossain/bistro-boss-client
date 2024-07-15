import Cover from "../Shared/Cover/Cover";
import ContactPageImg from "../../assets/contact/banner.jpg";
import SectionTitle from "../../components/SectionTitle";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Contact</title>
      </Helmet>
      <Cover
        img={ContactPageImg}
        title="Contact Us"
        subTitle="Do you have any queries?"
      ></Cover>
      <SectionTitle heading="Our Location" subHeading="Visit Us"></SectionTitle>

      <div className="max-w-6xl pb-8 px-10 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 font-inter">
        <div className="border">
          <div className="bg-[#D1A054] p-3">
            <MdOutlinePermPhoneMsg className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center">
            <h3 className="font-semibold uppercase">Phone</h3>
            <p>+38 (012) 34 56 789</p>
            <p>+48 (012) 39 78 000</p>
          </div>
        </div>

        <div className="border flex flex-col">
          <div className="bg-[#D1A054] p-3">
            <FaLocationDot className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center grow">
            <h3 className="font-semibold uppercase">Address</h3>
            <p>123 New Colony Street, P21, Bangladesh</p>
          </div>
        </div>
        <div className="border">
          <div className="bg-[#D1A054] p-3">
            <IoTime className="text-2xl text-white mx-auto" />
          </div>
          <div className="mx-2 mb-2 bg-[#F3F3F3] p-8 text-center">
            <h3 className="font-semibold uppercase">Working Hours</h3>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>

      <SectionTitle
        heading="Contact Form"
        subHeading="Send us a message"
      ></SectionTitle>

      <div className="max-w-6xl px-10 mx-auto mb-20">
        <form className="bg-[#F3F3F3] p-6 md:p-12">
          <div className="flex md:flex-row flex-col gap-4 mb-2">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Name*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                className="input text-base"
                required
              />
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold">Email*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="input text-base"
                required
              />
            </div>
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text font-semibold">Phone*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your phone number"
              name="phone"
              className="input text-base"
              required
            />
          </div>

          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text font-semibold">Your Message*</span>
              </div>
              <textarea
                name="message"
                className="textarea h-48 text-base"
                placeholder="Write your message here"
              ></textarea>
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button className="btn rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white w-60 font-cinzel">
              Send Message
              <IoIosSend className="text-2xl"></IoIosSend>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
