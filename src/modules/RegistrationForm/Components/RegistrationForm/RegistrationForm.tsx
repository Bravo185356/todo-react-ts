import { useState } from "react";
import { Modal, Box, Input, Button } from "@mui/material";
import { modalStyles } from "../../../../MuiStyles";
import { RegistrationApi } from "../../API/Api";

interface RegistrationFormProps {
  registrationPopup: boolean;
  setRegistrationPopup: Function;
}

export const RegistrationForm = function ({ registrationPopup, setRegistrationPopup }: RegistrationFormProps) {
  const [registrationInputs, setRegistrationInputs] = useState({ password: "", email: "" });
  return (
    <Modal onClose={() => setRegistrationPopup(false)} open={registrationPopup}>
      <Box sx={{ ...modalStyles, width: { sm: 400, xs: 0.9 / 1 } }}>
        <Input
          sx={{ width: "100%", marginBottom: 2 }}
          onChange={(e) => setRegistrationInputs({ ...registrationInputs, email: e.target.value })}
          type="text"
          value={registrationInputs.email}
          inputProps={{ placeholder: "email" }}
        />
        <Input
          sx={{ width: "100%", marginBottom: 2 }}
          onChange={(e) =>
            setRegistrationInputs({
              ...registrationInputs,
              password: e.target.value,
            })
          }
          type="text"
          value={registrationInputs.password}
          inputProps={{ placeholder: "Пароль" }}
        />

        <Button onClick={() => RegistrationApi.registration(registrationInputs)} sx={{ width: "100%" }} variant="contained">
          Создать
        </Button>
      </Box>
    </Modal>
  );
};
