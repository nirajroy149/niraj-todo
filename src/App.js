import { useState } from "react";
import ToDo from "./components/ToDo";
import Model from "./components/Model";
import "./styles.css";
import { HiOutlineLightBulb } from "react-icons/hi";
import { CiDark } from "react-icons/ci";

let date = new Date().toLocaleDateString();
const temp = [
  { id: 1, title: "Learn HTML", isCompleted: false, date: date },
  { id: 2, title: "Learn CSS", isCompleted: true, date: date },
  { id: 3, title: "Learn JS", isCompleted: false, date: date },
];

export default function App() {
  const [todos, setToDos] = useState(temp);
  const [filter, setFilter] = useState("All");
  const [modelShow, setModelShow] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [light,setLight] = useState(false);

  function addToDo(newVal) {
    if (newVal === "") return;
    setToDos([
      ...todos,
      {
        id: new Date().getTime(),
        title: newVal,
        isCompleted: false,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setFilter("All");
  }
  function workStatus(id) {
    let copy = [...todos];
    copy.forEach((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setToDos(copy);
  }
  function deletToDo(id) {
    let copy = [...todos];
    copy = copy.filter((todo) => todo.id !== id);
    setToDos(copy);
  }
  function clearCompleted() {
    let copy = [...todos];
    copy = copy.filter((todo) => todo.isCompleted !== true);
    setToDos(copy);
    setFilter("All");
  }
  function leftToDos() {
    let count = 0;
    todos.forEach((todo) => {
      if (todo.isCompleted === false) {
        count++;
      }
    });
    return count;
  }
  function filterShow() {
    if (filter === "Done") {
      return todos.filter((todo) => todo.isCompleted === true);
    } else if (filter === "Left") {
      return todos.filter((todo) => todo.isCompleted === false);
    } else {
      return todos;
    }
  }
  function handleDrag(sourceId) {
    let copy = [...todos];
    const sourceIndex = copy.findIndex((todo) => todo.id === sourceId);
    const targetIndex = copy.findIndex((todo) => todo.id === targetId);
    const first = copy[sourceIndex];
    copy[sourceIndex] = copy[targetIndex];
    copy[targetIndex] = first;
    setToDos(copy);
  }
  function handleTargetId(id) {
    setTargetId(id);
  }

  return (
    <>
      
      <section className={`${light?'light':'dark'}-theme app`}>
      <Model
        modelShow={modelShow}
        addToDo={addToDo}
        setModelShow={setModelShow}
      />
        <div className="appContainer">
          <div className="head-theme">
            <h1 className="heading">To Do List</h1>
            <button onClick={()=>setLight(!light)}>{light?<HiOutlineLightBulb/>:<CiDark />}</button>
          </div>
          <div className="add-remove">
            <button onClick={() => setModelShow(true)}>Add</button>
            <button onClick={() => setToDos([])}>Remove All</button>
          </div>

          {filterShow().length > 0 ? (
            <div className="todofooter">
              {filterShow().map((todo) => {
                return (
                  <ToDo
                    title={todo.title}
                    id={todo.id}
                    key={todo.id}
                    isCompleted={todo.isCompleted}
                    workStatus={workStatus}
                    deletToDo={deletToDo}
                    date={todo.date}
                    handleDrag={handleDrag}
                    handleTargetId={handleTargetId}
                  />
                );
              })}
            </div>
          ) : (
            <p className="nothing">Nothing to Show.</p>
          )}
          <div className="footer-container">
            <span>{leftToDos()} remaining todos</span>
            <div className="footer-btns">
              <button className={`${filter==='All'&&'active'}`} onClick={() => setFilter("All")}>All</button>
              <button className={`${filter==='Done'&&'active'}`} onClick={() => setFilter("Done")}>Done</button>
              <button className={`${filter==='Left'&&'active'}`} onClick={() => setFilter("Left")}>Left</button>
            </div>
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>
      </section>
    </>
  );
}
