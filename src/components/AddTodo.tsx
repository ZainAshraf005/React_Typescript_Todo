import { FormEvent, useEffect, useRef, useState } from "react";
import { useTodos } from "../store/todo";
import { useSearchParams } from "react-router-dom";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [check, setCheck] = useState(true);
  const { data, handleAddTodo, handleSelectAll, handleDeleteAll } = useTodos();
  const focus = useRef<HTMLInputElement>(null);
  const checkRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");
  const [checkParam, setCheckParam] = useState(false);

  useEffect(() => {
    setTodo(data);
    if (focus.current) {
      focus.current.focus();
    }
  }, [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.length < 3) {
      alert("task can't be less than 3 characters");
    } else {
      handleAddTodo(todo);
      setTodo("");
    }
  };

  const handleCheck = () => {
    if (checkRef.current) {
      setCheckParam(checkRef.current.checked);
    }
    setCheck(!check); // Toggle check state
    handleSelectAll(check); // Update all todos based on check
  };

  const handleAfterDelete = () => {
    handleDeleteAll();
    setTimeout(() => {
      if (checkRef.current) {
        checkRef.current.checked = !checkRef.current.checked;
        setCheck(true);
        setCheckParam(false);
      }
    }, 1000);
  };

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full pb-1 "
        onSubmit={handleSubmit}
      >
        <input
          className="bg-transparent w-full  sm:w-[70%] outline-none px-3 py-2 border rounded-lg border-zinc-800"
          ref={focus}
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="add new task"
        />
        <button
          className="px-3 py-2 text-center w-full sm:w-[25%]  justify-center bg-blue-700 rounded-lg text-white flex"
          type="submit"
        >
          <div className="w-full">add task</div>
        </button>
      </form>
      <div className="flex items-center justify-between border-b border-b-zinc-700">
        {todosData === null ? (
          <div>
            <input
              type="checkbox"
              ref={checkRef}
              name="all"
              onClick={handleCheck}
              defaultChecked={!check} // Initial checked state based on check
            />
            <label className="pl-2" htmlFor="all">
              select all
            </label>
          </div>
        ) : (
          ""
        )}

        {todosData === null && checkParam ? (
          <button className="text-red-700" onClick={handleAfterDelete}>
            delete all
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddTodo;
