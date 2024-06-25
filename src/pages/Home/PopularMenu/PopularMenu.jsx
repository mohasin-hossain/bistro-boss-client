import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularProducts = menu.filter(item => item.category === 'popular')

  return (
    <section className="max-w-7xl mx-auto px-10">
      <SectionTitle
        heading="From Our Menu"
        subHeading="Check it Out"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 my-20">
        {popularProducts.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
