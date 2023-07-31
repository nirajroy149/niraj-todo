import React, { useState } from "react";
import "../styles/model.css"
import {AiOutlineClose} from "react-icons/ai";


export default function Model({ modelShow, setModelShow, addToDo }) {
  const [newVal, setNewVal] = useState("");

  function handleChange(e) {
    setNewVal(e.target.value);
  }
  function handleAdd() {
    addToDo(newVal);
    setModelShow(false);
    setNewVal("");
  }
  if (modelShow) {
    return (
      <section className="modelSection">
        <div  className="modelContainer">
          <div className="title-close">
          <h3 className="heading">Add New ToDo</h3>
          <AiOutlineClose onClick={()=>setModelShow(false)}/>
          </div>
          <label htmlFor="newToDo">Title</label>
          <br />
          <input
            type="text"
            value={newVal}
            id="newToDo"
            name="newToDo"
            onChange={handleChange}
            autoFocus
          />
          <br />
        <div className="btn-group">
          <button className="addbtn" onClick={handleAdd}>Add</button>
          <button className="cancelbtn" onClick={() => {setModelShow(false);setNewVal('')}}>Cancel</button>
        </div>
        </div>
      </section>
    );
  }
}
