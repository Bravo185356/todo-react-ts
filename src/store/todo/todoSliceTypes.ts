import { ITodo } from "../../models";

export type ChangeTodoPayload = {
  listName: string;
  newTodoName: string;
  todo: ITodo;
};
export type AddNewTodoPayload = {
  listName: string;
  newTodo: ITodo;
};
export type AddTodoListPayload = {
  listName: string;
};
export type ToggleCompletePayload = {
  listName: string;
  todo: ITodo;
};
export type RemoveTodoPayload = {
  listName: string;
  todo: ITodo;
};
export type SetExpiredPayload = {
  listName: string;
  todo: ITodo;
};
