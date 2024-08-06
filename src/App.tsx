import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import "./App.css";
import reactSvg from "./assets/react.svg";
import typeScriptSvg from "./assets/typescript.svg";
import AddName from "./components/AddName";
import { useTodos } from "./store/todo";
import { useEffect, useState } from "react";

const App = () => {
  const { name } = useTodos();
  const [editVal, setEditVal] = useState(false);

  const handleEdit = () => {
    setEditVal(true);
  };

  useEffect(() => {
    setEditVal(false);
  }, [name]);

  return (
    <>
      <AddName value={editVal} />
      <main className="w-full flex justify-center items-center h-screen overflow-hidden bg-zinc-900  text-zinc-400">
        <div className=" p-4 h-full w-full lg:w-[50%]  md:w-[70%]">
          <h1 className="text-3xl uppercase m-4 text-center flex flex-col  sm:flex-row gap-3 items-center">
            <span className="flex gap-4 sm:gap-0">
              <img title="react js" className="spin duration-700 cursor-pointer" src={reactSvg} alt="" />
              + <img title="typescript" className="w-8  rounded-sm cursor-pointer" src={typeScriptSvg} alt="" />
            </span>
            <span
              className="cursor-pointer"
              title="click to edit the name"
              onClick={handleEdit}
            >
              {name.length > 0 ? `Hi, ${name} ` : "click to change the name"}
              <span className="text-red-700 animate-pulse">
                {name.length > 0 ? "❤" : ""}
              </span>
            </span>
          </h1>
          <Navbar />
          <AddTodo />
          <Todos />
        </div>
      </main>
    </>
  );
};

export default App;
