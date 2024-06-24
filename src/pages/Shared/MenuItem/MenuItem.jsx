const MenuItem = ({item}) => {
  const { name, image, price, recipe } = item;

  return (
    <div className="flex space-x-3">
      <img style={{borderRadius: "0 200px 200px 200px"}} className="w-[100px]" src={image} alt="" />
      <div className="grow">
        <h3 className="text-3xl">{name}</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-600">${price}</p>
    </div>
  );
};

export default MenuItem;
