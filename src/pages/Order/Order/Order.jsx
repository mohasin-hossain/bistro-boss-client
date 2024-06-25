import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import coverImg from "../../../assets/order/order.jpg";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../Shared/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";

const Order = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const soups = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div>
      <Cover
        img={coverImg}
        title="Order Food"
        subTitle="Would you like to try a dish?˝"
      ></Cover>

      <div className="max-w-7xl mx-auto px-10 my-8 text-center">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soups</Tab>
            <Tab>Desserts</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab foods={salads}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab foods={pizzas}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab foods={soups}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab foods={desserts}></OrderTab>
          </TabPanel>
          <TabPanel>
            <OrderTab foods={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
