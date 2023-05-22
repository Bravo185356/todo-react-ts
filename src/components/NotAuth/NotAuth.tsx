import classes from "./NotAuth.module.scss";
import { Button } from "@mui/material";

interface NotAuthProps {
  setLoginPopup: Function;
}

export default function NotAuth({ setLoginPopup }: NotAuthProps) {
  return (
    <>
      <div className={classes.needToLoginMessage}>Войдите для того чтобы начать</div>
      <div className={classes.buttonWrap}>
        <Button sx={{ width: "50%" }} variant="contained" onClick={() => setLoginPopup(true)}>
          Войти
        </Button>
      </div>
    </>
  );
}
