import { TodoItem } from "../../../../components/TodoItem/TodoItem";
import classes from "./TodoList.module.scss";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { ITodo } from "../../../../models";
import { useAppSelector } from "../../../../hooks/hooks";
interface TodoListProps {
  setShowModal: Function;
}
export const TodoList = function ({ setShowModal }: TodoListProps) {
  const params = useParams();

  const todos: ITodo[] = useAppSelector((state) => {
    const list = state.todo.value.find((item) => item.listName === params.listName);
    return list ? list.todos : [];
  });
  return (
    <div className={classes.listWrapper}>
      <Button variant="contained" onClick={() => setShowModal(true)}>
        Добавить
      </Button>
      {todos.length ? (
        todos.map((todo) => {
          return <TodoItem listName={params.listName!} todo={todo} key={todo.id} />;
        })
      ) : (
        <div className={classes.emptyText}>Тут пусто</div>
      )}
    </div>
  );
};
