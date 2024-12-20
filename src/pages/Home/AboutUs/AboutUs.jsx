import AboutUsImg from "../../../assets/order/order.jpg";
import Cover from "../../Shared/Cover/Cover";

const AboutUs = () => {
  return (
    <div className="my-8 md:my-20 font-cinzel">
      <Cover
        img={AboutUsImg}
        title="About Us"
        subTitle="Bistro Boss Restaurant opened its doors in 2010, quickly becoming a beloved local dining spot. Over the years, Bistro Boss has gained a reputation for its warm ambiance and exceptional service. Today, it remains a favorite gathering place for food enthusiasts and families alike."
      ></Cover>
    </div>
  );
};

export default AboutUs;
