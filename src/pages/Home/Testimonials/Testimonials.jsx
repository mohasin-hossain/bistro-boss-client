import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const reverseReviews = [...reviews].reverse();

  return (
    <section className="my-20 max-w-7xl mx-auto px-10">
      <SectionTitle
        heading="Testimonials"
        subHeading="What Our Clients Say"
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reverseReviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="px-8 flex flex-col items-center space-y-4">
              <Rating style={{ maxWidth: 140 }} value={review.rating} readOnly />
              <p className="w-2/3 text-center">{review.review}</p>
              <h5 className="text-3xl text-yellow-500">{review.name}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
