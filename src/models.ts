export interface ITodo {
    id: number,
    name: string,
    deadline: string | null,
    completed: boolean,
    isExpired: boolean
}
export interface IList {
    listName: string,
    todos: ITodo[]
}