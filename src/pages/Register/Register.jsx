import RegisterPageImg from "../../assets/others/authentication1.png";

const Register = () => {

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
      };


    return (
        <div className="bg-form-image">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-center min-h-screen">
          <div className="md:flex md:flex-row-reverse items-center justify-center p-12 border-2 shadow-md bg-form-image">
            <div className="md:w-1/2">
              <img src={RegisterPageImg} alt="" />
            </div>
            <div className="md:w-1/2">
              <form onSubmit={handleRegister} className="card-body">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    placeholder="Type the text above"
                    name="captcha"
                    className="input input-bordered"
                    ref={captchaRef}
                    required
                  />
                  <button
                    onClick={handleCaptchaValidation}
                    className="btn btn-neutral mt-4 btn-xs"
                  >
                    Validate
                  </button>
                </div> */}
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;