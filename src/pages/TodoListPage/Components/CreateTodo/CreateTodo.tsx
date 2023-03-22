import { useState } from "react";
import { Input, Switch, Button, FormControlLabel, Modal, Box } from "@mui/material";
import classes from "./CreateTodo.module.scss";
import { ITodo } from "../../../../models";
import { addNewTodo } from "../../../../store/todo/todoSlice";
import { useDispatch } from "react-redux";
import { modalStyles } from "../../../../MuiStyles";
import DatePicker from "../../../../modules/DatePicker/DatePicker";

interface InputProps {
  listName: string;
  showModal: boolean;
  setShowModal: Function;
}

export const CreateTodo = function ({ listName, showModal, setShowModal }: InputProps) {
  const [showDeadlineInputs, setShowDeadlineInputs] = useState(false);
  const [inputName, setInputName] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

  function createNewTodo() {
    let deadline = showDeadlineInputs ? deadlineInput : null;

    const newTodo: ITodo = {
      id: Date.now(),
      name: inputName,
      deadline,
      completed: false,
      isExpired: false,
    };

    dispatch(addNewTodo({ listName, newTodo }));
    setInputName("");
    setDeadlineInput("");
    
  }

  function closeModal() {
    setDeadlineInput('')
    setInputName('')
    setShowDeadlineInputs(false)
    setShowModal(false)
  }

  return (
    <Modal onClose={() => closeModal()} open={showModal}>
      <Box sx={{ ...modalStyles, width: { sm: 400, xs: 0.9 / 1 } }}>
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
                onChange={() => {
                  setDatePickerVisible(!datePickerVisible);
                  setShowDeadlineInputs(!showDeadlineInputs);
                }}
                sx={{ marginLeft: 0 }}
                labelPlacement="start"
                control={<Switch />}
                label="Дедлайн"
                value={showDeadlineInputs}
              />
            </div>
            {showDeadlineInputs && (
              <div>
                {deadlineInput && <div>Дедлайн: {deadlineInput}</div>}
                {datePickerVisible && (
                  <div className={classes.deadlineInputs}>
                    <DatePicker setDatePickerVisible={setDatePickerVisible} setDeadlineInput={setDeadlineInput} />
                  </div>
                )}
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
