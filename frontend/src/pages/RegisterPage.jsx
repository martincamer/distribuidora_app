import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLogoPlayStore } from "react-icons/bi";
import img from "../assets/intro.jpg";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex gap-12 items-center border-slate-200 border-[1px] max-md:px-8">
      <div class="flex items-center gap-2 justify-center bg-blue-500 text-white px-4 py-2 rounded cursor-pointer md:hidden">
        <BiLogoPlayStore className="text-5xl" />
        <span className="font-semibold">
          Descargar la app en PlayStore o AppStore
        </span>
      </div>
      <img
        className="w-[55%] object-cover opacity-[0.7] h-[100%] max-md:hidden"
        src={img}
      />
      <Card>
        {registerErrors?.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-semibold text-center mb-5">
          Registrate ahora
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            type="text"
            name="username"
            placeholder="Pon el nombre del usuario"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}
          <Label htmlFor="email">Correo electronico</Label>
          <Input
            name="email"
            placeholder="correo@gmail.com"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <div>
            <Button>Crear cuenta ahora</Button>
          </div>{" "}
        </form>
        <p className="justify-between flex mt-5 text-sm">
          Ya tienes una cuenta?
          <Link to="/login" className="text-sky-500 font-semibold underline">
            Inicia Sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
