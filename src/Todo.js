import React, { useState, useEffect } from "react";
import "./style.css";
const Todo = () => {
  // getting time
  let time = new Date().toLocaleTimeString();
  const [curTime, setCutTime] = useState(time);
  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCutTime(time);
  };
  setInterval(updateTime, 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // getting day
  let day = new Date().getDay();
  const [curDay, setCurDay] = useState(days[day]);
  const updateDay = () => {
    day = new Date().getDay();
    setCurDay(days[day]);
  };

  setInterval(updateDay, 1000);

  // getting from local storge
  const getLocal = () => {
    const list = localStorage.getItem("todo");

    if (list) {
      return JSON.parse(list);  //convert from string syntax
    } else {
      return [];
    }
  };
  const [taskVal, setTaskVal] = useState("");
  const [items, setItems] = useState(getLocal);
  const [curEditItem, setCurEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  // adding item with id
  const addItem = () => {
    if (!taskVal) {
      alert("no entry");                          // alert if no todo is added
    } else if (taskVal && toggleBtn) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === curEditItem) {
            return { ...curElem, name: taskVal };  //  ...curElem in the spread operator    
            }                                      //All properties of curElem are copied (...curElem)                                                                                                                         
          return curElem;                          //The name property is updated with the value of taskVal.
        })
      );
      setTaskVal("");
      setCurEditItem(null);
      setToggleBtn(false);
    } else {
      const myItem = {
        id: new Date().getTime().toString(),      //current timestamp, unique and can be used as a unique identifier (id) 
        name: taskVal,
      };

      setItems([...items, myItem]);
      setTaskVal("");
    }
  };
  // dlt items
  const deleteItem = (index) => {                     //index: This parameter represents the id
    const updatedItems = items.filter((curElem) => {  //filter method creates a new array (updatedItems) 
      return curElem.id !== index;                    //containing all elements of items except curElem.id !== index
    });
    setItems(updatedItems);
  };
  // edit items
  const editItem = (index) => {                     //  index: This parameter represents the id  ,to edit a todo item from a list.
    const updated_edit = items.find((curElem) => {  //This finds the item in the items array that matches the id
      return curElem.id === index;
    });
    setCurEditItem(index);                          //keep track of which item is currently being edited in the UI.

    setTaskVal(updated_edit.name);                 // input field or form is populated with the current name of the task being edited,
    setToggleBtn(true);                            //UI component responsible for editing tasks should be displayed or activated.
  };
  // storing in local storage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(items));  //save the items array browser's localStorage   ,localStorage can only store string data.
  }, [items]);

  const check = () => {
    const list = localStorage.getItem("name");    //checks if there is a stored value under the key "name" in localStorage.
    if (list) {
      return false;
    } else {
      return true;                                //user's name is already stored (false) or needs to be set (true).
    }
  };

  const getName = () => {
    let namee = localStorage.getItem("name");      //retrieves the JSON string stored under the key "name"
    return JSON.parse(namee);                      //parses the JSON string into a JavaScript object
  };


  const [userName, setUserName] = useState(getName);  //Initializes userName state with the result of getName(), from local storage

  const [greet, setGreet] = useState(check);          //Initializes greet state with the result of check()
  const [uname, setUname] = useState("");             // capture and temporarily store user input (new name) before storing it in localStorage.
  
  
  const store = () => {
    localStorage.setItem("name", JSON.stringify(uname));    //stores the stringified uname under the key "name" in localStorage.
    setGreet(false);                                        // indicating that the user's name is now stored.
    setUserName(uname);                                     //updates the userName state with the newly stored user's name
  };

  return (
    <>
      <div className="timeDay">
        <span className="time">{curTime},</span>
        <span className="day">{curDay}</span>
      </div>
      {greet ? (
        <div className="nameinput">
          <input
            type="text"
            className="nametext"
            placeholder="enter your name"
            value={uname}
            onChange={(e) => {
              setUname(e.target.value);
            }}
          />
          <button className="namebtn" onClick={store}>
            Submit
          </button>
        </div>
      ) : (
        <h2 className="nameoutput">Greetings <span className="name">{userName}</span></h2>
      )}
      <div className="input">
        <div className="text_input">
          <input
            type="text"
            placeholder="Enter your task✍️"
            className="task_input"
            value={taskVal}
            onChange={(event) => setTaskVal(event.target.value)}
          />
          {toggleBtn ? (
            <i className="fas fa-edit" onClick={addItem}></i>
          ) : (
            <i className="fas fa-plus " onClick={addItem}></i>
          )}
        </div>
      </div>
      {items.map((curElem) => {
        return (
          <div className="eachElement" key={curElem.id}>
            <div className="element">
              <h3 className="task">{curElem.name}</h3>
              <div className="sidebar">
                <i
                  className="fas fa-edit  "
                  onClick={() => editItem(curElem.id)}
                ></i>
                <i
                  className="fas fa-trash-alt "
                  onClick={() => deleteItem(curElem.id)}
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Todo;
