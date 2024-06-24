import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("./menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularProducts = data.filter(
          (menu) => menu.category === "popular"
        );
        setMenu(popularProducts);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-10">
      <SectionTitle
        heading="From Our Menu"
        subHeading="Check it Out"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 my-20">
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
