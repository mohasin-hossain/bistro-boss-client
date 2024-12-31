import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../components/SectionTitle";

import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://bistro-boss-server-production-5043.up.railway.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const reverseReviews = [...reviews].reverse();

  return (
    <section className="my-8 md:my-20 max-w-7xl mx-auto">
      <SectionTitle
        heading="Testimonials"
        subHeading="What Our Customer's Say"
      ></SectionTitle>

      <div data-aos="fade-up">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {reverseReviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="px-0 md:px-8 flex flex-col items-center space-y-4">
                <Rating
                  style={{ maxWidth: 140 }}
                  value={review.rating}
                  readOnly
                />
                <p className="font-cinzel font-bold text-sm">
                  {review.menuName}
                </p>
                <p className="w-2/3 text-center font-inter text-sm md:text-xl text-gray-600">
                  {review.review}
                </p>
                <p className="text-base md:text-2xl text-yellow-500">
                  - {review.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
