import { TodoList } from "../../../../modules/TodoList";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks/hooks";
import NotAuth from "../../../../components/NotAuthPage/NotAuth";

interface TodoListPageProps {
  setLoginPopup: Function;
}

export default function TodoListPage({ setLoginPopup }: TodoListPageProps) {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const isLogined = useAppSelector((state) => state.userInfo.isLogined);
  return (
    <>
      {!isLogined ? (
        <NotAuth setLoginPopup={setLoginPopup} />
      ) : (
        <>
          {" "}
          <CreateTodo listName={params.listName!} setShowModal={setShowModal} showModal={showModal} />
          <TodoList setShowModal={setShowModal} />
        </>
      )}
    </>
  );
}
