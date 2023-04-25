import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import classes from "./TodoItem.module.scss";
import { ITodo } from "../../models";
import { MoreVert, Check } from "@mui/icons-material";
import { Input, Button, MenuItem, Menu, IconButton, Modal, Box } from "@mui/material";
import { increaseLevelCount } from "../../store/statistic/statisticSlice";
import { modalStyles, settingButtonStyles } from "../../MuiStyles";
import { changeTodo, removeTodo, setExpired } from "../../store/todo/todoSlice";
import { toggleComplete } from "../../store/todo/todoSlice";
import { convertDate } from "../../service/convertDate";

interface TodoItemProps {
  todo: ITodo;
  listName?: string;
  optionMenu?: Boolean;
}

export const TodoItem = function ({ todo, listName = "", optionMenu = true }: TodoItemProps) {
  const [optionsMenu, setOptionsMenu] = useState<null | HTMLElement>(null);
  const [modalShow, setModalShow] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [newTodoName, setNewTodoName] = useState(todo.name);
  
  const open = Boolean(optionsMenu);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerID = setInterval(() => checkDeadline(), 5000);
    return () => clearInterval(timerID);
  }, [todo.isExpired]);

  function changeCompletedStatus() {
    dispatch(increaseLevelCount());
    dispatch(toggleComplete({ todo, listName }));
    setModalShow(false);
  }
  function toggleEdit() {
    setEditTodo(true);
    setOptionsMenu(null);
  }
  function saveChanges() {
    setEditTodo(false);
    dispatch(changeTodo({ listName, newTodoName, todo }));
  }
  function checkDeadline() {
    if (todo.deadline) {
      const date = convertDate(todo.deadline);
      if (Date.parse(date) <= Date.now()) {
        dispatch(setExpired({ listName, todo }));
      }
    }
  }

  return (
    <div className={classes.todoWrapper}>
      <div className={classes.todoInfo}>
        {todo.isExpired && <div className={classes.expired}>Просрочено</div>}
        {editTodo ? (
          <div className={classes.changeNameBlock}>
            <Input onChange={(e) => setNewTodoName(e.target.value)} value={newTodoName} />
            <Button variant="contained" sx={{ color: "white", p: "0", minWidth: "34px" }} onClick={saveChanges}>
              <Check />
            </Button>
          </div>
        ) : (
          <div className={classes.todoName}>Название: {todo.name}</div>
        )}
        {todo.deadline && <div className={classes.todoDeadline}>{`Дедлайн: ${todo.deadline}`}</div>}
      </div>
      {optionMenu && (
        <>
          <IconButton sx={settingButtonStyles} onClick={(e) => setOptionsMenu(e.currentTarget)}>
            <MoreVert fontSize="large" />
          </IconButton>
          <Menu anchorEl={optionsMenu} onClose={() => setOptionsMenu(null)} open={open}>
            <MenuItem onClick={toggleEdit}>Редактировать</MenuItem>
            <MenuItem onClick={() => dispatch(removeTodo({ listName, todo }))}>Удалить</MenuItem>
          </Menu>
        </>
      )}
      <Button
        onClick={() => setModalShow(true)}
        color={todo.completed ? "success" : "error"}
        variant="contained"
        disabled={todo.completed ? true : false}
      >
        {todo.completed ? "Выполнено" : "Не выполнено"}
      </Button>
      <Modal onClose={() => setModalShow(false)} open={modalShow}>
        <Box sx={{ ...modalStyles, width: { sm: 400, xs: 0.9 / 1 } }}>
          <div className={classes.confirmText}>Пометить это задание, как выполненное?</div>
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
};
