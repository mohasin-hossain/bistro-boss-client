import PropTypes from "prop-types";

const MenuItem = ({ item, animation }) => {
  const { name, image, price, recipe } = item;

  return (
    <div className="flex items-center space-x-3" data-aos={animation} >
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
        src={image}
        alt=""
      />
      <div className="grow">
        <h3 className="text-xs md:text-xl font-cinzel font-semibold">{name}</h3>
        <p className="text-xs md:text-base font-inter text-[#737373]">
          {recipe}
        </p>
      </div>
      <p className="text-xs md:text-xl text-yellow-600 font-bold font-cinzel">
        ${price}
      </p>
    </div>
  );
};

export default MenuItem;

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  animation: PropTypes.string.isRequired,
};
