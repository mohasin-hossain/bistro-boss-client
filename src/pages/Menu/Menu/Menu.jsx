import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import SectionTitle from "../../../components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";

import menuImg from "../../../assets/dashboard/image-5.jpg";
import dessertsImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const soups = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover
        img={menuImg}
        title="Our Shop"
        subTitle="Would you like to try a dish?"
      ></Cover>
      <SectionTitle
        heading="Today's Offer"
        subHeading="Don't Miss"
      ></SectionTitle>
      {/* Offers Menu */}
      <MenuCategory items={offered}></MenuCategory>
      {/* Desserts Menu */}
      <MenuCategory
        items={desserts}
        img={dessertsImg}
        title="desserts"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
      {/* Pizza Menu */}
      <MenuCategory
        items={pizzas}
        img={pizzaImg}
        title="pizza"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
      {/* Salad Menu */}
      <MenuCategory
        items={salads}
        img={saladImg}
        title="salad"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
      {/* Soup Menu */}
      <MenuCategory
        items={soups}
        img={soupImg}
        title="soups"
        subTitle="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      ></MenuCategory>
    </div>
  );
};

export default Menu;
