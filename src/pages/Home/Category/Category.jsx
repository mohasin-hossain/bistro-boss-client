import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide4.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide2.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const handleLink = (category) => {
    navigate(`/order/${category}`);
  };

  return (
    <section>
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11:00am to 10:00pm"}
      ></SectionTitle>
      <div className="max-w-7xl mx-auto font-cinzel" data-aos="fade-up">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide className="pb-12 md:py-16">
            <div className="cursor-pointer" onClick={() => handleLink("salad")}>
              <img src={slide1} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Salad
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-12 md:py-16">
            <div
              className="cursor-pointer"
              onClick={() => handleLink("desserts")}
            >
              <img src={slide2} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Desserts
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-12 md:py-16">
            <div className="cursor-pointer" onClick={() => handleLink("soups")}>
              <img src={slide3} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Soups
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-12 md:py-16">
            <div className="cursor-pointer" onClick={() => handleLink("pizza")}>
              <img src={slide4} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Pizza
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-12 md:py-16">
            <div className="cursor-pointer" onClick={() => handleLink("salad")}>
              <img src={slide5} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Salad
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-12 md:py-16">
            <div className="cursor-pointer" onClick={() => handleLink("soups")}>
              <img src={slide3} alt="" />
              <h3 className="text-xl md:text-4xl text-white uppercase text-center -mt-6 md:-mt-12">
                Soups
              </h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
