import { FormEvent, useEffect, useRef, useState } from "react";
import { useTodos } from "../store/todo";

interface MyComponentProps {
  value: boolean;
}

const AddName: React.FC<MyComponentProps> = (props) => {
  const [value, setValue] = useState("");
  const { handleAddName,  } = useTodos();
  const [show, setShow] = useState(true);
  const valueRef = useRef<HTMLInputElement>(null)

  const handleName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddName(value);
    setShow(false);
  };

  

  

  useEffect(() => {
    setShow(props.value);
    // if(props.value){
    //     if(valueRef.current){
    //         valueRef.current.focus();
    //         valueRef.current.value = "";
    //     }
    // }
  }, [props.value]);

  return (
    <>
      {show ? (
        <main className="absolute  text-zinc-200 text-center z-50  bg-zinc-950 opacity-90 flex justify-center items-center w-full h-screen overflow-hidden">
          <div className="border p-7 flex flex-col gap-7">
            <h1>Enter your name please!</h1>
            <form className="flex flex-col" onSubmit={handleName}>
              <input
                ref={valueRef}
                placeholder="enter your name"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-transparent outline-none rounded border px-3"
              />
              <button
                className="px-3 py-1 bg-blue-700 outline-none rounded mt-3"
                type="submit"
              >
                save my name
              </button>
            </form>
          </div>
        </main>
      ) : (
        ""
      )}
    </>
  );
};

export default AddName;
