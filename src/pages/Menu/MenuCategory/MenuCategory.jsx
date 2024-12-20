import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import PropTypes from "prop-types";

const MenuCategory = ({ title, subTitle, img, items }) => {
  return (
    <div>
      {title && <Cover img={img} title={title} subTitle={subTitle}></Cover>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 my-8 lg:my-12 max-w-7xl mx-auto px-10">
        {items.map((item, index) => (
          <MenuItem
            key={item._id}
            item={item}
            animation={index % 2 === 0 ? "fade-right" : "fade-left"}
          ></MenuItem>
        ))}
      </div>
      <div className="flex justify-center" data-aos="zoom-in">
        <Link to={`/order/${title || "salad"}`}>
          <button className="btn btn-outline border-0 border-b-2 border-[#BB8506] bg-[#E8E8E8] uppercase text-[#BB8506] mb-8 font-cinzel">
            {title ? `Order ${title}` : "Order Now"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;

MenuCategory.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
