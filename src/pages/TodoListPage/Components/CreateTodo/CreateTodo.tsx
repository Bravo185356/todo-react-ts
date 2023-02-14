import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Input, Switch, Button, FormControlLabel, TextField, Modal, Box } from "@mui/material";
import classes from "./CreateTodo.module.scss";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormingDate } from "../../../../modules/Todos/helpers/FormingDate";
import { ITodo } from "../../../../models";
import { addNewTodo } from "../../../../store/todo/todoSlice";
import { useDispatch } from "react-redux";
import { modalStyles } from "../../../../components/TodoItem/MuiStyles";

interface InputProps {
  listName: string;
  showModal: boolean;
  setShowModal: Function
}

export const CreateTodo = function ({ listName, showModal, setShowModal }: InputProps) {
  const [showDeadlineInputs, setShowDeadlineInputs] = useState(false);
  const [inputName, setInputName] = useState("");
  const [deadlineInput, setDeadlineInput] = useState<Dayjs | null>(dayjs(null));
  const dispatch = useDispatch();

  function createNewTodo() {
    let deadline = deadlineInput!.isValid() ? FormingDate(deadlineInput!) : null;

    const newTodo: ITodo = {
      id: Date.now(),
      name: inputName,
      deadline,
      completed: false,
      isExpired: false,
    };

    dispatch(addNewTodo({ listName, newTodo }));
    setInputName("");
    setDeadlineInput(dayjs(null));
  }

  return (
    <Modal onClose={() => setShowModal(false)} open={showModal}>
      <Box sx={{ ...modalStyles, width: 400 }}>
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <div className={classes.title}>Добавьте что-нибудь в список</div>
            <div>{listName}</div>
            <Input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="Введите..."
            />
            <div className={classes.deadlineBlock}>
              <FormControlLabel
                onChange={() => setShowDeadlineInputs(!showDeadlineInputs)}
                sx={{ marginLeft: 0 }}
                labelPlacement="start"
                control={<Switch />}
                label="Дедлайн"
                value={showDeadlineInputs}
              />
            </div>
            {showDeadlineInputs && (
              <div className={classes.deadlineInputs}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    showDaysOutsideCurrentMonth={true}
                    inputFormat="DD/MM/YYYY HH:mm"
                    ampm={false}
                    mask={"__/__/____ __:__"}
                    disablePast={true}
                    renderInput={(props) => (
                      <TextField {...props} inputProps={{ ...props.inputProps, placeholder: "ДД/ММ/ГГГГ ЧЧ:ММ" }} />
                    )}
                    label="Выберите дату"
                    value={deadlineInput}
                    onChange={(newValue) => {
                      setDeadlineInput(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            )}
            <Button variant="contained" onClick={createNewTodo}>
              Добавить
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
