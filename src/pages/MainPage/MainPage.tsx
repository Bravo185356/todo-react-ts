import { useAppSelector } from "../../hooks/hooks";
import NotAuth from "../../components/NotAuth/NotAuth";

interface MainPageProps {
  setLoginPopup: Function;
}

export default function MainPage({ setLoginPopup }: MainPageProps) {
  const todoLists = useAppSelector((state) => state.todo.value.length);
  const isLogined = useAppSelector((state) => state.userInfo.isLogined);
  return (
    <>
      {!isLogined ? (
        <NotAuth setLoginPopup={setLoginPopup} />
      ) : !todoLists ? (
        <>
          <div>Добро пожаловать в Todo App</div>
          <div>Создайте свой первый список</div>
        </>
      ) : (
        <div>Какая-то информация</div>
      )}
    </>
  );
}
