import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AddNewTodoPayload, AddTodoListPayload, ChangeTodoPayload, RemoveTodoPayload, SetExpiredPayload, ToggleCompletePayload } from "./todoSliceTypes";
import { IList } from "../../models";

export interface TodosState {
  value: IList[];
}

const initialState: TodosState = {
  value: [],
};
const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setState(state, actions) {
      state.value = actions.payload;
    },
    addTodoList(state, actions: PayloadAction<AddTodoListPayload>) {
      state.value.push({
        listName: actions.payload.listName,
        todos: [],
      });
      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    addNewTodo(state, actions: PayloadAction<AddNewTodoPayload>) {
      const { listName, newTodo } = actions.payload;
      state.value.find((item) => item.listName === listName)?.todos.push(newTodo);

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    changeTodo(state, actions: PayloadAction<ChangeTodoPayload>) {
      const { listName, newTodoName, todo } = actions.payload;
      state.value
        .find((item) => item.listName === listName)!
        .todos.find((item: any) => item.id === todo.id)!.name = newTodoName;

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    toggleComplete(state, actions: PayloadAction<ToggleCompletePayload>) {
      const { todo, listName } = actions.payload;
      state.value
        .find((item) => listName === item.listName)!
        .todos.find((item: any) => todo.id === item.id)!.completed = true;

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    removeTodo(state, actions:PayloadAction<RemoveTodoPayload>) {
      const { listName, todo: deletedTodo } = actions.payload;

      const filteredTodoList = state.value!
        .find((item) => item.listName === listName)!
        .todos.filter((todo: any) => todo.id !== deletedTodo.id);

      state.value.find((item) => item.listName === listName)!.todos = filteredTodoList;
      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    setExpired(state, actions:PayloadAction<SetExpiredPayload>) {
      const { listName, todo: expiredTodo } = actions.payload;

      state.value
        .find((list) => list.listName === listName)!
        .todos.find((todo: any) => todo.id === expiredTodo.id)!.isExpired = true;

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    removeList(state, actions: PayloadAction<string>) {
      console.log(actions.payload)
      state.value = state.value.filter((list) => list.listName !== actions.payload)
      localStorage.setItem('todos', JSON.stringify(state.value))
    }
  },
});
export const {
  addTodoList,
  addNewTodo,
  changeTodo,
  toggleComplete,
  setState,
  removeTodo,
  setExpired,
  removeList
} = todo.actions;
export default todo.reducer;
