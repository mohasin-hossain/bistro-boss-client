import FoodCard from "../../Shared/FoodCard/FoodCard";

const OrderTab = ({ foods }) => {
  return (
      <div className="grid grid-cols-3 gap-4 mt-8">
        {foods.map((item) => (
          <FoodCard key={item._id} item={item}></FoodCard>
        ))}
      </div>
  );
};

export default OrderTab;
