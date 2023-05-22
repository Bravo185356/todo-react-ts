import { TodoList } from "../../modules/TodoList";
import { useAppSelector } from "../../hooks/hooks";
import NotAuth from "../../components/NotAuth/NotAuth";

interface TodoListPageProps {
  setLoginPopup: Function;
}

export default function TodoListPage({ setLoginPopup }: TodoListPageProps) {
  const isLogined = useAppSelector((state) => state.userInfo.isLogined);
  return (
    <>
      {!isLogined ? (
        <NotAuth setLoginPopup={setLoginPopup} />
      ) : (
        <>
          <TodoList />
        </>
      )}
    </>
  );
}
