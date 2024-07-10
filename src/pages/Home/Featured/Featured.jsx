import SectionTitle from "../../../components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import moment from "moment";

const Featured = () => {
  return (
    <section className="bg-featured-image bg-fixed bg-cover bg-no-repeat text-white">
      <div className="bg-black bg-opacity-60 py-4 md:py-14">
        <SectionTitle
          subHeading={"Check it Out"}
          heading={"Dish of the Week"}
        ></SectionTitle>

        <div className="container mx-auto px-10 my-12">
          <div className="md:flex justify-center items-center gap-12">
            <div>
              <img src={featuredImg} className="rounded-md" alt="" />
            </div>
            <div className="space-y-2 text-center mt-4">
              <p className="text-sm text-gray-400">{moment().format('MMMM Do, YYYY')}</p>
              <h4 className="text-2xl font-cinzel">Saffron-infused Risotto</h4>
              <p className="font-inter text-center">
              A creamy delight perfectly balanced with aromatic herbs and fresh seasonal vegetables. Elevate your dining experience with this exquisite blend of flavors, available exclusively at Bistro Boss Restaurant. Don't miss the chance to savor this culinary masterpiece from our chef's special menu!
              </p>
              <button className="btn btn-outline mt-4 text-white rounded-none border-0 border-b-2 font-cinzel">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
