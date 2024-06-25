const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item;

  return (
    <div>
      <div className="bg-base-100 shadow-xl rounded-none flex flex-col">
        <figure className="relative">
          <img className="w-full" src={image} alt="" />
          <p className="p-1 bg-slate-900 text-white w-20 absolute top-4 right-4">${price}</p>
        </figure>
        <div className="card-body grow">
          <h2 className="card-title mx-auto">{name}</h2>
          <p className="text-gray-500">{recipe.length > 80 ? recipe.slice(0, 80) + "..." : recipe}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-outline border-0 border-b-2 border-[#BB8506] bg-[#E8E8E8] uppercase text-[#BB8506]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
