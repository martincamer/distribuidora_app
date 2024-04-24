import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useProductos } from "../context/ProductosContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function ProductoFormPage() {
  const { createProducto, getProducto, updateProducto } = useProductos();

  const navigate = useNavigate();

  const params = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(params.id);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateProducto(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createProducto({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/productos");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getProducto(params.id);

        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
