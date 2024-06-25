import FoodCard from "../../Shared/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const OrderTab = ({ foods }) => {
  if (!foods || foods.length === 0) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }

  const chunkedFoods = chunkArray(foods, 6);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div>
      <Swiper
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-navigation-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "25px",
          "--swiper-pagination-bullet-horizontal-gap": "8px",
        }}
        pagination={pagination}
        navigation={true}
        mousewheel={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {chunkedFoods.map((slideFoods, index) => (
          <SwiperSlide key={index} className="mb-16 px-16">
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {slideFoods.map((item) => (
                <FoodCard key={item._id} item={item}></FoodCard>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Helper function to chunk the array into smaller arrays
const chunkArray = (array, size) => {
  const chunkedArr = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, index + size));
    index += size;
  }
  return chunkedArr;
};

export default OrderTab;
