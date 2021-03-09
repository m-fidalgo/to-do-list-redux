import * as ToDoConstants from "../actions/ToDoActions";

const ToDoReducer = (items = [], action) => {
  switch (action.type) {
    case ToDoConstants.TODO_LIST:
      return action.items;
    case ToDoConstants.TODO_CREATE:
      return [...items, action.newItem];
    case ToDoConstants.TODO_UPDATE:
      return items.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        } else return item;
      });
    case ToDoConstants.TODO_REMOVE:
      const itemIndex = items.findIndex((item) => item.id === action.id);
      return [...items.slice(0, itemIndex), ...items.slice(itemIndex + 1)];
    case ToDoConstants.TODO_CLEAR:
      return items.filter((item) => !item.isChecked);
    default:
      return items;
  }
};

export default ToDoReducer;
