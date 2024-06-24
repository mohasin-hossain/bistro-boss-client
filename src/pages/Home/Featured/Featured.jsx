import SectionTitle from "../../../components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";

const Featured = () => {
  return (
    <section className="bg-featured-image bg-fixed bg-cover bg-no-repeat text-white">
      <div className="bg-black bg-opacity-60 py-14">
        <SectionTitle
          subHeading={"Check it Out"}
          heading={"From Our Menu"}
        ></SectionTitle>

        <div className="container mx-auto px-10 my-12">
          <div className="md:flex justify-center items-center gap-12">
            <div>
              <img src={featuredImg} alt="" />
            </div>
            <div>
              <p>March 30, 2025</p>
              <h4 className="text-2xl">Where Can I Get Some?</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
                deserunt deleniti doloremque reprehenderit odio suscipit fugit,
                eum dolorum itaque vitae quisquam iste aperiam officiis alias
                ducimus veritatis incidunt, quo odit?
              </p>
              <button className="btn btn-outline mt-4 text-white rounded-none border-0 border-b-2">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
