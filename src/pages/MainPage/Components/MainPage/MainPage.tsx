import React from "react";
import { useAppSelector } from "../../../../hooks/hooks";
import { Button } from "@mui/material";
import classes from './MainPage.module.scss';

interface MainPageProps {
  setLoginPopup: Function,
}

export default function MainPage({setLoginPopup}: MainPageProps) {
  const todoLists = useAppSelector((state) => state.todo.value.length);
  const isLogin = useAppSelector(state => state.userInfo.isLogined)
  return (
    <>
      {!isLogin ? (
        <div>
          <div className={classes.needToLoginMessage}>Войдите для того чтобы начать</div>
          <div className={classes.buttonWrap}>
            <Button sx={{width: '50%'}} variant="contained" onClick={() => setLoginPopup(true)}>Войти</Button>
          </div>
        </div>
      ) : !todoLists ? (
        <div>
          <div>Добро пожаловать в Todo</div>
          <div>Создайте свой первый список</div>
        </div>
      ) : (
        <div>Какая-то информация</div>
      )}
    </>
  );
}
