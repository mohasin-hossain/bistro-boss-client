import { Parallax, Background } from "react-parallax";

const Cover = ({ img, title, subTitle }) => {
  return (
    <Parallax bgImage={img} strength={300}>
      <div
        className="hero min-h-screen"
        style={{
          height: 500,
        }}
      >
          <div className="hero-overlay bg-opacity-40 w-1/2 h-1/2"></div>
          <div className="hero-content text-white text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
              <p className="mb-5">{subTitle}</p>
            </div>
          </div>
      </div>
    </Parallax>
  );
};

export default Cover;
