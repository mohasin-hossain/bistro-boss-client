const MenuItem = ({item}) => {
  const { name, image, price, recipe } = item;

  return (
    <div className="flex space-x-3">
      <img style={{borderRadius: "0 200px 200px 200px"}} className="w-[100px] h-[100px]" src={image} alt="" />
      <div className="grow">
        <h3 className="text-xl font-cinzel font-semibold">{name}</h3>
        <p className="font-inter text-[#737373]">{recipe}</p>
      </div>
      <p className="text-yellow-600 font-bold font-cinzel">${price}</p>
    </div>
  );
};

export default MenuItem;
