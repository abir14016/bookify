import loginImage from "../../src/assets/images/login.webp";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type ISignInInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInInput>();

  // submit button
  const onSubmit: SubmitHandler<ISignInInput> = async (data) => {
    console.log(data);
  };
  return (
    <div className="md:flex justify-evenly items-center px-2 md:px-8 lg:px-12 h-screen">
      <div>
        <div className="card w-96 bg-base-100 shadow-xl border-2">
          <div className="card-body">
            <h2 className="text-center text-3xl font-bold">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* email field */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "plz provide a valid email",
                    },
                  })}
                />
                {(errors.email?.type === "required" ||
                  errors.email?.type === "pattern") && (
                  <p className="text-sm text-warning" role="alert">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              {/* email field */}

              {/* password field */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "password must contain at least 1 number & 1 letter",
                    },
                    minLength: {
                      value: 8,
                      message: "plz provide 8 characters or longer",
                    },
                  })}
                />
                {(errors.password?.type === "required" ||
                  errors.password?.type === "pattern" ||
                  errors.password?.type === "minLength") && (
                  <p className="text-sm text-warning" role="alert">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              {/* password field */}

              <input
                className="btn btn-sm btn-primary w-full max-w-xs mt-4"
                type="submit"
                value="SIGN IN"
              />
            </form>

            <p className="text-xs text-end">
              new to bookify?{" "}
              <Link className="link link-hover text-blue-500" to="/signup">
                create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div>
        <img src={loginImage} alt="loginImage" />
      </div>
    </div>
  );
};

export default SignIn;
