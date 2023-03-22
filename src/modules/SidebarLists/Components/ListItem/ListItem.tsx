import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import classes from "../../Styles/linkStyles.module.scss";
import { removeList } from "../../../../store/todo/todoSlice";
import { useAppDispatch } from "../../../../hooks/hooks";

interface ListItemProps {
    listName: string,
    setCurrentLink: Function,
    currentLink: string
}

export default function ListItem({ listName, setCurrentLink, currentLink }: ListItemProps) {
  const linkClasses = [classes.link, classes.linkActive];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function deleteTodoList(listName: string) {
    dispatch(removeList(listName));
    navigate("/");
  }
  return (
    <>
      <Link
        onClick={() => setCurrentLink(listName)}
        className={currentLink === listName ? linkClasses.join(" ") : classes.link}
        to={`/${listName}`}
      >
        {listName}
      </Link>
      {currentLink === listName && (
        <DeleteOutlineOutlinedIcon className={classes.deleteIcon} color="primary" onClick={() => deleteTodoList(listName)} />
      )}
    </>
  );
}
