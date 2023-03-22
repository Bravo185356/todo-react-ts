import { useState } from "react";
import { Modal, Box, Input, Button } from "@mui/material";
import { modalStyles } from "../../../MuiStyles";
import { LoginApi } from "../API/Api";
import { validation } from "../../../service/validation";
import { setUserInfo, toggleLogin } from "../../../store/userInfo/userInfoSlice";
import { useAppDispatch } from "../../../hooks/hooks";

interface LoginFormProps {
  loginPopup: boolean;
  setLoginPopup: Function;
  setRegistrationPopup: Function;
}

export const LoginForm = function ({ loginPopup, setLoginPopup, setRegistrationPopup }: LoginFormProps) {
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [loginInputsError, setLoginInputsError] = useState({ email: false, password: false });
  const dispatch = useAppDispatch();

  async function loginIn() {
    const [email, password] = validation(loginInputs);

    if (email && password) {
      const result = await LoginApi.login(loginInputs);
      if (!result.error) {
        localStorage.setItem("idToken", JSON.stringify(result.idToken));
        localStorage.setItem("refreshToken", JSON.stringify(result.refreshToken));

        const userInfo = await LoginApi.getInfo(result.idToken);

        dispatch(setUserInfo(userInfo.users[0]));
        dispatch(toggleLogin());

        setLoginPopup(false);
      }
    } else {
      // неверная валидация вернет [false, false], а для стилей ошибки нужно передать true
      setLoginInputsError({ email: !email, password: !password });
    }
  }
  return (
    <Modal onClose={() => setLoginPopup(false)} open={loginPopup}>
      <Box sx={{ ...modalStyles, width: { sm: 400, xs: 0.9 / 1 } }}>
        <Input
          error={loginInputsError.email}
          sx={{ width: "100%", marginBottom: 2 }}
          onChange={(e) => setLoginInputs({ ...loginInputs, email: e.target.value })}
          type="text"
          value={loginInputs.email}
          inputProps={{ placeholder: "Логин" }}
        />
        <Input
          error={loginInputsError.password}
          sx={{ width: "100%", marginBottom: 2 }}
          onChange={(e) => setLoginInputs({ ...loginInputs, password: e.target.value })}
          type="text"
          value={loginInputs.password}
          inputProps={{ placeholder: "Пароль" }}
        />
        <div className="registrationBlock">
          <span>Нет аккаунта?</span>
          <span
            onClick={() => {
              setLoginPopup(false);
              setRegistrationPopup(true);
            }}
            className="createAccount"
          >
            Создать
          </span>
        </div>
        <Button onClick={loginIn} sx={{ width: "100%" }} variant="contained">
          Войти
        </Button>
      </Box>
    </Modal>
  );
};
