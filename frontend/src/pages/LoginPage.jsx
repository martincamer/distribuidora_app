import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import { BiLogoPlayStore } from "react-icons/bi";
import img from "../assets/intro.jpg";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex gap-12 items-center max-md:px-4">
      {/* <div class="flex items-center gap-2 justify-center bg-blue-500 text-white px-4 py-2 rounded cursor-pointer md:hidden">
        <BiLogoPlayStore className="text-5xl" />
        <span className="font-semibold">
          Descargar la app en PlayStore o AppStore
        </span>
      </div> */}

      <img
        className="w-[55%] object-cover opacity-[0.7] h-[100%] max-md:hidden"
        src={img}
      />

      <Card>
        {loginErrors?.map((error, i) => (
          <Message message={error} key={i} />
        ))}

        <h1 className="text-xl font-semibold text-center mb-5">
          Te damos la bienvenida 👋
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <Label htmlFor="email">Email del registro</Label>
            <Input
              label="Write your email"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              {...register("email", { required: true })}
            />
            <p>{errors.email?.message}</p>
          </div>

          <div>
            <Label htmlFor="password">Contraseña del registro</Label>
            <Input
              type="password"
              name="password"
              placeholder="******************"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p>{errors.password?.message}</p>
          </div>

          <div className="text-sm mt-2">
            <Button>Iniciar Sesion</Button>
          </div>
        </form>

        <p className="flex gap-x-2 justify-between mt-3 text-sm">
          No tienes una cuenta aun?{" "}
          <Link to="/register" className="text-sky-500 font-semibold underline">
            Registrate ahora
          </Link>
        </p>
      </Card>
    </div>
  );
}
