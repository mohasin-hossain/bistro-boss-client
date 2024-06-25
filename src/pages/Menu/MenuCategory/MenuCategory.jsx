import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ title, subTitle, img, items }) => {
  return (
    <div>
      {title && <Cover img={img} title={title} subTitle={subTitle}></Cover>}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 my-20 max-w-7xl mx-auto px-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
