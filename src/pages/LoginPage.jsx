import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import {
  IoPersonAdd,
  IoLogIn,
  IoEyeSharp,
  IoEyeOffSharp,
} from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Turnstile from "react-turnstile";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signIn, isAuthenticated, errors: loginErrors, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);

  // token de Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordShown((v) => !v);
  };

  useEffect(() => {
    if (isAuthenticated === false) return;

    if (isAuthenticated && isAdmin) navigate("/products");
    else navigate("/getallproducts");
  }, [isAuthenticated, isAdmin, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    // enviamos el token al backend junto con credenciales
    await signIn({ ...values, turnstileToken });
  });

  return (
    <div className="flex items-center justify-center h-screen" aria-hidden="false">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold mb-5">Iniciar Sesión</h1>

        {loginErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              style={{ border: errors.email ? "2px solid red" : "" }}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-2">
            <label>Password</label>
            <div className="flex justify-end items-center relative">
              <input
                type={passwordShown ? "text" : "password"}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                style={{ border: errors.password ? "2px solid red" : "" }}
                placeholder="Password"
                {...register("password")}
              />
              {passwordShown ? (
                <IoEyeSharp
                  size={30}
                  className="absolute mr-2 w-10 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeOffSharp
                  size={30}
                  className="absolute mr-2 w-10 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Turnstile */}
          <div className="my-3">
            <Turnstile
              sitekey="0x4AAAAAACG6IdL-gky04INl"
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken("")}
              onError={() => setTurnstileToken("")}
              // opcional: "auto" | "light" | "dark"
              theme="dark"
            />
          </div>

          <Tooltip title="Iniciar sesión">
            <span>
              <button
                type="submit"
                disabled={!turnstileToken}
                className="bg-transparent hover:bg-zinc-500
                           text-zinc-500 hover:text-white
                           font-semibold py-2 px-4 border-zinc-100 border
                           hover:border-transparent rounded mb-2"
              >
                <IoLogIn size={30} />
              </button>
            </span>
          </Tooltip>
        </form>

        <div className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿No tienes una cuenta?
          <Link to="/register" className="text-sky-500">
            <div className="flex mx-2 px-2 items-start">
              !Resistrate¡
              <IoPersonAdd size={30} className="mx-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
