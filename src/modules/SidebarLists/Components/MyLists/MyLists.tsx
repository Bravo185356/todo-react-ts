import linkClasses from "../../Styles/linkStyles.module.scss";
import classes from "./MyLists.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/hooks";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CreateModal from "../CreateModal/CreateModal";
import { Menu, MenuItem } from "@mui/material";
import ListItem from "../ListItem/ListItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const MyLists = function () {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [dropMenu, setDropMenu] = useState<null | HTMLElement>(null);
  const [currentLink, setCurrentLink] = useState("");

  const open = Boolean(dropMenu);
  const linkActiveClasses = [linkClasses.link, linkClasses.linkActive];

  const lists = useAppSelector((state) => state.todo.value.map((list) => list.listName));
  const isLogined = useAppSelector((state) => state.userInfo.isLogined);
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentLink("");
    }
  }, [location]);
  return (
    <div className={classes.body}>
      <div className={classes.title} onClick={(e) => setDropMenu(e.currentTarget)}>
        {screenWidth <= 600 ? (
          <>
            <span>Списки</span>
            <KeyboardArrowDownIcon className={dropMenu && classes.iconActive} />
          </>
        ) : (
          "Списки"
        )}
      </div>
      {screenWidth <= 600 ? (
        <div className={classes.listMobile}>
          <Menu autoFocus={false} sx={{ marginTop: "5px" }} anchorEl={dropMenu} onClose={() => setDropMenu(null)} open={open}>
            <ul className={classes.list}>
              {lists.length > 0 ? (
                lists.map((listName) => {
                  return (
                    <MenuItem onClick={() => setDropMenu(null)} key={listName} className={classes.listItem}>
                      <ListItem listName={listName} setCurrentLink={setCurrentLink} currentLink={currentLink} />
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem onClick={() => setDropMenu(null)} className={classes.listItem}>
                  Пусто
                </MenuItem>
              )}
            </ul>
          </Menu>
        </div>
      ) : (
        <ul className={classes.list}>
          {lists.map((listName) => {
            return (
              <div key={listName} className={classes.listItem}>
                <ListItem listName={listName} setCurrentLink={setCurrentLink} currentLink={currentLink} />
              </div>
            );
          })}
        </ul>
      )}
      <Button
        sx={{ p: "5px", width: "100%", mb: "10px" }}
        variant="contained"
        onClick={() => isLogined && setShowCreateListModal(true)}
      >
        Создать список
      </Button>
      <div className={classes.linksBlock}>
        <Link
          onClick={() => setCurrentLink("completed")}
          className={currentLink === "completed" ? linkActiveClasses.join(" ") : linkClasses.link}
          to={"/completed"}
        >
          Выполненные
        </Link>
      </div>
      <CreateModal showCreateListModal={showCreateListModal} setShowCreateListModal={setShowCreateListModal} />
    </div>
  );
};
