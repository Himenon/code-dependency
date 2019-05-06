import { createItem, TodoItem } from "./TodoItem";

export const TODO_LIST_CONSTANT_VALUE = "TODO_LIST";

export interface TodoList {
  items: TodoItem[];
  add: (name: string) => void;
  delete: (item: TodoItem) => void;
}

export const createTodoList = (): TodoList => {
  const items: TodoItem[] = [];
  console.log(TODO_LIST_CONSTANT_VALUE);
  const todoList: TodoList = {
    items,
    add: (name) => {
      console.log("add", name);
      items.push(createItem(name, todoList));
    },
    delete: (item) => {
      console.log("delete", item);
      item.delete();
    }
  }
  return todoList;
}
