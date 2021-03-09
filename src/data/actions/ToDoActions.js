import { ToDoService } from "../services/ToDoService";

export const TODO_LIST = "TODO_LIST";
export const TODO_CREATE = "TODO_CREATE";
export const TODO_UPDATE = "TODO_UPDATE";
export const TODO_REMOVE = "TODO_REMOVE";
export const TODO_CLEAR = "TODO_CLEAR";

export const list = () => {
  return async (dispatch) => {
    const items = await ToDoService.list();
    dispatch({
      type: TODO_LIST,
      items,
    });
  };
};

export const create = (description) => {
  return async (dispatch) => {
    const newItem = await ToDoService.create({
      description,
      isChecked: false,
    });
    dispatch({
      type: TODO_CREATE,
      newItem,
    });
  };
};

export const update = (item) => {
  return async (dispatch) => {
    await ToDoService.update(item);
    dispatch({
      type: TODO_UPDATE,
      item,
    });
  };
};

export const remove = (id) => {
  return async (dispatch) => {
    await ToDoService.remove(id);
    dispatch({
      type: TODO_REMOVE,
      id,
    });
  };
};

export const clear = () => {
  return (dispatch, getState) => {
    const toDoList = getState().ToDoReducer;
    toDoList.forEach((item) => {
      if (item.isChecked) {
        ToDoService.remove(item.id);
      }
    });
    dispatch({
      type: TODO_CLEAR,
    });
  };
};
