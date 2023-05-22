import { useMemo } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { TodoItem } from "../../components/TodoItem/TodoItem";
import classes from "./CompletedTodos.module.scss";

export const CompletedTodosPage = function () {
  const todos = useAppSelector((state) => state.todo.value);

  const completedTodos = useMemo(() => {
    const completedTodos = [];
    for (const list of todos) {
      completedTodos.push(...list.todos.filter((todo) => todo.completed === true));
    }
    return completedTodos;
  }, [todos]);
  
  return (
    <div className={classes.CompletedTodoWrapper}>
      {completedTodos.length === 0 ? (
        <div className={classes.notExistMessage}>Пока что у вас нету выполненных задач</div>
      ) : (
        completedTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} optionMenu={false} />;
        })
      )}
    </div>
  );
};
