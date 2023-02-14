import classes from "./SidebarLists.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { removeList } from "../../../../store/todo/todoSlice";
import CreateModal from "../CreateModal/CreateModal";

export const SidebarLists = function () {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  const linkClasses = [classes.link, classes.linkActive];
  const lists = useAppSelector((state) => state.todo.value.map((list) => list.listName));
  const isLogined = useAppSelector(state => state.userInfo.isLogined)

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentLink("");
    }
  }, [location]);
  function deleteTodoList(listName: string) {
    dispatch(removeList(listName));
    navigate("/");
  }
  return (
    <div className={classes.body}>
      <div className={classes.title}>Списки</div>
      <ul className={classes.list}>
        {lists.map((listName) => {
          return (
            <div key={listName} className={classes.listItem}>
              <Link
                onClick={() => setCurrentLink(listName)}
                className={currentLink === listName ? linkClasses.join(" ") : classes.link}
                to={`/${listName}`}
              >
                {listName}
              </Link>
              {currentLink === listName && (
                <DeleteOutlineOutlinedIcon
                  className={classes.deleteIcon}
                  color="primary"
                  onClick={() => deleteTodoList(listName)}
                />
              )}
            </div>
          );
        })}
      </ul>
      <Button sx={{ p: "3px", width: "100%", mb: "10px" }} variant="contained" onClick={() => isLogined && setShowCreateListModal(true)}>
        Создать список
      </Button>
      <div className={classes.linksBlock}>
        <Link
          onClick={() => setCurrentLink("completed")}
          className={currentLink === "completed" ? linkClasses.join(" ") : classes.link}
          to={"/completed"}
        >
          Выполненные
        </Link>
      </div>
      <CreateModal showCreateListModal={showCreateListModal} setShowCreateListModal={setShowCreateListModal} />
    </div>
  );
};
