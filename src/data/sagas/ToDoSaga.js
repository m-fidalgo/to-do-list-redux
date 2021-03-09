import * as ToDoActions from "../actions/ToDoActions";
import { ToDoService } from "../services/ToDoService";
import { all, put, takeEvery, takeLatest, select } from "redux-saga/effects";

//listar
function* watchList() {
  //takeLatest -> vai pegar a última ação disparada
  yield takeLatest(ToDoActions.TODO_LIST, list);
}

function* list() {
  const items = yield ToDoService.list();

  //put tem o msm efeito q o dispatch
  yield put(ToDoActions.listResponse(items));
}

//criar
function* watchCreate() {
  //takeEvery -> pega todas as ações
  yield takeEvery(ToDoActions.TODO_CREATE, create);
}

function* create(action) {
  const newItem = yield ToDoService.create({
    description: action.description,
    isChecked: false,
  });

  yield put(ToDoActions.createResponse(newItem));
}

//update
function* watchUpdate() {
  yield takeEvery(ToDoActions.TODO_UPDATE, update);
}

function* update(action) {
  yield ToDoService.update(action.item);
}

//remover
function* watchRemove() {
  yield takeEvery(ToDoActions.TODO_REMOVE, remove);
}

function* remove(action) {
  yield ToDoService.remove(action.id);
}

//clear
function* watchClear() {
  yield takeLatest(ToDoActions.TODO_CLEAR, clear);
}

function* clear() {
  //o select pega o state atual da store
  const state = yield select();
  const items = state.ToDoReducer;
  console.log(items);
  const uncheckedItems = items.filter((item) => !item.isChecked);
  const checkedItems = items.filter((item) => item.isChecked);

  checkedItems.forEach((item) => {
    ToDoService.remove(item.id);
  });

  yield put(ToDoActions.listResponse(uncheckedItems));
}

export default function* ToDoSaga() {
  //yield - "pausa" a função: na prox exec ela continua dps dele
  yield all([
    watchList(),
    watchCreate(),
    watchRemove(),
    watchClear(),
    watchUpdate(),
  ]);
}
