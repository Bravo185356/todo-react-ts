import { useState } from "react";
import { Modal, Box, Input, Button } from "@mui/material";
import { modalStyles } from "../../../../MuiStyles";
import { useAppDispatch } from "../../../../hooks/hooks";
import { addTodoList } from "../../../../store/todo/todoSlice";

interface CreateModalProps {
  showCreateListModal: boolean;
  setShowCreateListModal: Function;
}

export default function CreateModal({ showCreateListModal, setShowCreateListModal }: CreateModalProps) {
  const [newListName, setNewListName] = useState("");

  const dispatch = useAppDispatch();

  function createNewTodoList() {
    dispatch(addTodoList({ listName: newListName }));
    setShowCreateListModal(false);
  }
  return (
    <Modal onClose={() => setShowCreateListModal(false)} open={showCreateListModal}>
      <Box sx={{ ...modalStyles, width: { sm: 400, xs: 0.9 / 1 } }}>
        <Input
          sx={{ width: "100%", marginBottom: 2 }}
          onChange={(e) => setNewListName(e.target.value)}
          type="text"
          value={newListName}
          inputProps={{ placeholder: "Название списка..." }}
        />
        <Button onClick={createNewTodoList} sx={{ width: "100%" }} variant="contained">
          Создать
        </Button>
      </Box>
    </Modal>
  );
}
