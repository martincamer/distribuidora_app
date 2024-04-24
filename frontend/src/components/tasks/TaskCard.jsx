import { useProductos } from "../../context/ProductosContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCard({ task }) {
  const { deleleteProducto } = useProductos();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleleteProducto(task._id)}>Delete</Button>
          <ButtonLink to={`/editar-producto/${task._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
