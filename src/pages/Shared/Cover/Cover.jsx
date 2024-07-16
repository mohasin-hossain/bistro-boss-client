import { Parallax } from "react-parallax";
import PropTypes from "prop-types";

const Cover = ({ img, title, subTitle }) => {
  return (
    <Parallax
      bgImage={img}
      bgImageStyle={{ objectFit: "cover" }}
      strength={300}
    >
      <div
        className="hero md:min-h-screen"
        style={{
          height: 500,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-40 w-11/12 h-3/5 md:w-1/2 md:h-1/2"></div>
        <div
          className="hero-content text-white text-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="max-w-md font-cinzel p-8">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold uppercase">
              {title}
            </h1>
            <p className="mb-5 text-xs md:text-base">{subTitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;

Cover.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
