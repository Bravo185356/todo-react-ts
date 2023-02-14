import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import classes from "./TodoItem.module.scss";
import { ITodo } from "../../models";
import { MoreVert, Check } from "@mui/icons-material";
import { Input, Button, MenuItem, Menu, IconButton, Modal, Box } from "@mui/material";
import { increaseLevelCount } from "../../store/statistic/statisticSlice";
import { modalStyles, settingButtonStyles } from "./MuiStyles";
import { changeTodo, removeTodo, setExpired } from "../../store/todo/todoSlice";
import { toggleComplete } from "../../store/todo/todoSlice";

interface TodoItemProps {
  todo: ITodo;
  listName?: string;
  optionMenu?: Boolean;
}

export const TodoItem = function({ todo, listName = '', optionMenu = true }: TodoItemProps) {
  const [isExpired, setIsExpired] = useState(false);
  const [optionsMenu, setOptionsMenu] = useState<null | HTMLElement>(null);
  const [modalShow, setModalShow] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [todoName, setTodoName] = useState(todo.name);
  // Двусторонее связывание с изменяющим название инпутом
  const open = Boolean(optionsMenu);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(todo.isExpired) {
      console.log('isExpired')
      setIsExpired(true)
      return
    }
    const timerID = setInterval(() => checkDeadline(), 5000);
    console.log(timerID)
    return () => clearInterval(timerID);
  }, [todo.isExpired]);
  function changeCompletedStatus() {
    dispatch(increaseLevelCount());
    dispatch(toggleComplete({ todo, listName }));
    setModalShow(false);
  }
  function completedButtonClick() {
    if (!todo.completed) {
      setModalShow(true);
    }
  }
  function edit() {
    setEditTodo(true);
    setOptionsMenu(null);
  }
  function saveChanges() {
    setEditTodo(false);
    dispatch(changeTodo({ listName, newTodoName: todoName, todo: todo }));
  }
  function convertDate() {
    return (
      todo.deadline!.split(" ")[0].split(".").reverse().join("-") +
      "T" +
      todo.deadline!.split(" ")[1]
    );
  }
  function checkDeadline() {
    if (todo.deadline) {
      console.log('deadline')
      const date = convertDate();
      if (Date.parse(date) <= Date.now()) {
        dispatch(setExpired({listName, todo}))
      }
    }
  }

  return (
    <div className={classes.todoWrapper}>
      <div className={classes.todoInfo}>
        {isExpired && <div>Просрочено</div>}
        {editTodo ? (
          <div className={classes.changeNameBlock}>
            <Input onChange={(e) => setTodoName(e.target.value)} value={todoName} />
            <Button
              variant="contained"
              sx={{ color: "white", p: "0", minWidth: "34px" }}
              onClick={saveChanges}
            >
              <Check />
            </Button>
          </div>
        ) : (
          <div className={classes.todoName}>Название: {todo.name}</div>
        )}
        {todo.deadline && (
          <div className={classes.todoDeadline}>{`Дедлайн: ${todo.deadline}`}</div>
        )}
      </div>
      {optionMenu && (
        <>
          <IconButton
            sx={settingButtonStyles}
            onClick={(e) => setOptionsMenu(e.currentTarget)}
          >
            <MoreVert fontSize="large" />
          </IconButton>
          <Menu anchorEl={optionsMenu} onClose={() => setOptionsMenu(null)} open={open}>
            <MenuItem onClick={edit}>Редактировать</MenuItem>
            <MenuItem onClick={() => dispatch(removeTodo({ listName, todo }))}>
              Удалить
            </MenuItem>
          </Menu>
        </>
      )}
      <Button
        onClick={completedButtonClick}
        color={todo.completed ? "success" : "error"}
        variant="contained"
        disabled={todo.completed ? true : false}
      >
        {todo.completed ? "Выполнено" : "Не выполнено"}
      </Button>
      <Modal onClose={() => setModalShow(false)} open={modalShow}>
        <Box sx={modalStyles}>
          <div className={classes.confirmText}>
            Вы действительно хотите пометить это задание, как выполненное?
          </div>
          <div className={classes.buttonsBlock}>
            <Button variant="contained" onClick={changeCompletedStatus}>
              Да
            </Button>
            <Button variant="contained" onClick={() => setModalShow(false)}>
              Нет
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
