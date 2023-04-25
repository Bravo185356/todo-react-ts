import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Menu, MenuItem } from "@mui/material";
import { toggleLogin } from "../../store/userInfo/userInfoSlice";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  const [dropMenu, setDropMenu] = useState<null | HTMLElement>(null);

  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  const isLogin = useAppSelector((state) => state.userInfo.isLogined);
  const screenWidth = useAppSelector((state) => state.screenWidth.screenWidth);

  const open = Boolean(dropMenu);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(toggleLogin());
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    setDropMenu(null);
    navigate("/");
  }
  return (
    <div className={classes.header}>
      <Link to={"/"} className={classes.title}>
        Todo App
      </Link>
      <div className={classes.authBlock}>
        {isLogin && 
          <>
            <div className={classes.userName} onClick={(e) => setDropMenu(e.currentTarget)}>
              {screenWidth <= 600 ? <PersonIcon /> : userInfo.email}
            </div>
            <Menu
              autoFocus={false}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ marginTop: "5px" }}
              anchorEl={dropMenu}
              onClose={() => setDropMenu(null)}
              open={open}
            >
              <MenuItem>Настройки</MenuItem>
              <MenuItem onClick={logout}>Выйти</MenuItem>
            </Menu>
          </>
        }
      </div>
    </div>
  );
}
