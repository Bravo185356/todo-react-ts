import React from "react";
import { useAppSelector } from "../../../../hooks/hooks";
import { Button } from "@mui/material";
import classes from './MainPage.module.scss';

interface MainPageProps {
  setLoginPopup: Function,
}

export default function MainPage({setLoginPopup}: MainPageProps) {
  const todoLists = useAppSelector((state) => state.todo.value.length);
  const isLogined = useAppSelector(state => state.userInfo.isLogined)
  return (
    <>
      {!isLogined ? (
        <div className={classes.mainBlock}>
          <div className={classes.needToLoginMessage}>Войдите для того чтобы начать</div>
          <div className={classes.buttonWrap}>
            <Button sx={{width: '50%'}} variant="contained" onClick={() => setLoginPopup(true)}>Войти</Button>
          </div>
        </div>
      ) : !todoLists ? (
        <div className={classes.mainBlock}>
          <div>Добро пожаловать в Todo App</div>
          <div>Создайте свой первый список</div>
        </div>
      ) : (
        <div>Какая-то информация</div>
      )}
    </>
  );
}
