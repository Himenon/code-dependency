import { TodoList, TODO_LIST_CONSTANT_VALUE } from "./TodoList";

export interface TodoItem {
  name: string;
  delete: () => void;
}

/**
 * This is circular dependency sample code!
 *
 * @param name 
 * @param todoList circular dependency !!
 */
export const createItem = (name: string, todoList: TodoList): TodoItem => {
  return {
    name: name + TODO_LIST_CONSTANT_VALUE,
    delete: () => {
      const idx = todoList.items.findIndex(item => item.name == name);
      delete todoList.items[idx];
    }
  }
}
