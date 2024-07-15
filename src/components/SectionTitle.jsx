import PropTypes from "prop-types";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mx-auto md:w-4/12 my-8 font-cinzel">
      <p className="text-yellow-500 font-thin mb-2">--- {subHeading} ---</p>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-thin uppercase border-y-4 py-3">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};
