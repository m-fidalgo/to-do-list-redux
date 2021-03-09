import React from "react";
import ToDoList from "./views/components/ToDoList";
import NewToDoItem from "./views/components/NewToDoItem";

import * as ToDoActions from "./data/actions/ToDoActions";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  return (
    <div className="App">
      <NewToDoItem
        onAdd={(description) => {
          props.dispatch(ToDoActions.create(description));
        }}
      />
      <hr />
      <button
        className="tw-btn"
        onClick={() => {
          props.dispatch(ToDoActions.clear());
        }}
      >
        Limpar
      </button>
      <hr />
      <ToDoList
        items={props.items}
        onRemove={(id) => {
          props.dispatch(ToDoActions.remove(id));
        }}
        onUpdate={(item) => {
          props.dispatch(ToDoActions.update(item));
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.ToDoReducer,
});

export default connect(mapStateToProps)(App);
