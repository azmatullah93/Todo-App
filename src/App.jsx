import Navbar from "./components/Navbar";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <>
      <Navbar />

      
      <div className="md:container md:w-1/2 content-center box-border mx-auto bg-violet-100 p-5 my-5 rounded-xl">
        <div className="testingDiv flex flex-col">
          <h1 className="font-bold text-center text-xl">
            iTask- manage your todos at one place
          </h1>

          <h1 className="font-bold text-xl my-3 text-center">Add a Todo</h1>
          <div className="addTodo">
            <input
              onChange={handleTodo}
              onKeyDown={handleKeyDown}
              value={todo}
              type="text"
              name="todo"
              id=""
              className="w-full my-3 rounded-md"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="addTodo w-full my-3 bg-violet-800 disabled:bg-violet-500 text-white py-1 px-2 text-sm font-bold rounded-md hover:bg-violet-900"
            >
              Add
            </button>
            <div className="flex gap-3">
              <input
                onChange={toggleFinished}
                checked={showFinished}
                type="checkbox"
                id="toggleFinished"
                className=""
              />
              <label htmlFor="toggleFinished">Show Finished</label>
              {/* <p> Show finished todos</p> */}
            </div>

            <h1 className="font-bold text-xl">Your Todos</h1>

            <div className="todos">
              {todos.length === 0 ? (
                <div className="my-5">No Todos to show</div>
              ) : (
                ""
              )}

              {todos.map((item) => {
                return (
                  (showFinished || !item.isCompleted) && (
                    <div
                      key={item.id}
                      className="todo flex overflow-auto text-wrap my-3 justify-between"
                    >
                      <div className="flex gap-3">
                        <input
                          onClick={handleCheckBox}
                          name={item.id}
                          type="checkbox"
                          className="checkbox"
                        />
                        <div className={item.isCompleted ? "line-through" : ""}>
                          {item.todo}
                        </div>
                      </div>

                      <div className="buttons flex h-full box-border">
                        <button
                          onClick={(e) => {
                            handleEdit(e, item.id);
                          }}
                          className="bg-violet-800 text-white text-sm font-bold py-1 px-2 rounded-md mx-3 hover:bg-violet-900"
                        >
                          <AiTwotoneEdit />
                        </button>
                        <button
                          onClick={(e) => {
                            handleDelete(e, item.id);
                          }}
                          className="bg-violet-800 text-white text-sm font-bold py-1 px-2 rounded-md  hover:bg-violet-900"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
