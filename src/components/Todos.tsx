import { useSearchParams } from "react-router-dom";
import { useTodos } from "../store/todo";
import { MdDelete, MdEdit } from "react-icons/md";
  
const Todos = () => {
  const { todos, handleChange, handleDelete, handleEdit } = useTodos();
  let todoArray = todos;
  const [searchParams] = useSearchParams();

  const todosData = searchParams.get("todos");
  if (todosData === "active") {
    todoArray = todos.filter((e) => e.isCompleted === false);

  }

  if (todosData === "completed") {
    todoArray = todos.filter((e) => e.isCompleted === true);
    
  }

  return (
    <div className="h-[70%] sm:h[90%] pb-7">
      <ul className="overflow-scroll text-center h-full pb-28 scrollbar">
        {todoArray.length>0?
        todoArray.map((e) => {
          return (
            <li className="p-7 pb-0 border-b transition-colors duration-300 ease-in-out hover:bg-zinc-800 cursor-pointer border-zinc-600" key={e.id}>
              <div className="uppercase flex items-center justify-between text-zinc-200">
                <div className="flex-1 flex ">
                  <input
                    className=" w-4 h-4 text-green-600  rounded   ring-offset-gray-800  bg-gray-700 border-gray-600"
                    type="checkbox"
                    name="box"
                    onChange={() => handleChange(e.id)}
                    checked={e.isCompleted}
                  />
                </div>
                <label className="flex-1  " htmlFor="box">
                  <div
                    className={`${
                      e.isCompleted ? "line-through text-red-700" : ""
                    } flex-1 flex justify-center`}
                  >
                    {e.task}
                  </div>
                </label>
                <div className="flex-1 flex  justify-end">
                  <button
                    className="px-3  rounded-lg bg-green-700 mx-3"
                    onClick={() => handleEdit(e.id)}
                  >
                    <MdEdit />
                  </button>

                  <button
                    disabled={!e.isCompleted}
                    className="p-2  rounded-lg disabled:bg-zinc-700 bg-red-700"
                    onClick={() => handleDelete(e.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-2  text-zinc-600">
                {/* <div className="name">{e.createdAt.toLocaleDateString()}</div> */}
              </div>
            </li>
          );
        }):<h1 className="h-full flex justify-center items-center">Not tasks to show</h1>}
      </ul>
    </div>
  );
};

export default Todos;
