import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {
    children : ReactNode;
}

export type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
    createdAt: Date;
};

export type TodosContext = {
    todos:Todo[];
    data:string;
    name:string;
    setName:React.Dispatch<React.SetStateAction<string>>;
    handleAddTodo:(task:string)=> void;
    handleChange:(id:string)=> void;
    handleDelete:(id:string)=>void;
    handleEdit:(id:string)=>void;
    handleAddName:(value:string)=>void;
    handleNameEdit:()=>void;
    handleSelectAll: (check:boolean)=>void;
    handleDeleteAll: ()=> void;
}


export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps)=>{
    
    const[name, setName] = useState(()=>{
        try {
            const localValue = localStorage.getItem("nameValue")||"";
            return localValue
        } catch (error) {
            return ""
        }
    });
    const[data,setData] = useState("");
    const [todos, setTodos] = useState<Todo[]>(()=>{
        try {
            const localTodos = localStorage.getItem("todos")||"[]";
            return JSON.parse(localTodos)
        } catch (error) {
            return []
        }
    });
    
    const handleDeleteAll = ()=>{
        setTodos([])
        localStorage.setItem("todos",JSON.stringify([]))
    }

    const handleSelectAll = (check:boolean)=>{
        console.log(check)  
        setTodos((prev)=>{
            if(check){
                const newArr = prev.map((e)=>{
                    return{...e,isCompleted:true}
                })
                return newArr;
            }

            const arrNew = prev.map((e)=>{
                return{...e,isCompleted:false}
            })
            return arrNew   
        })
    }

    const handleNameEdit = ()=>{
        console.log("clicked")
        localStorage.setItem("nameValue","");
    }

    const handleAddTodo = (task: string)=>{
        setTodos((prev)=> {
                const newTodo:Todo[]=[
                {
                    id:Math.random().toString(),
                    task:task,
                    isCompleted: false,
                    createdAt:new Date(),
                },
                ...prev,
            ]

            localStorage.setItem("todos",JSON.stringify(newTodo))
            return newTodo;
    });
    };

    const handleChange = (id:string)=>{
        setTodos((prev)=>{
            const newTodo = prev.map((e)=>{
                if(id===e.id){
                    return{...e,isCompleted:!e.isCompleted}
                }
                return e;
            })
            localStorage.setItem("todos",JSON.stringify(newTodo))
            return newTodo;
        });
    }

   const handleDelete = (id:string)=>{
    setTodos((prev)=>{
        const newTodo = prev.filter((filteredTodo)=> filteredTodo.id !== id);
        localStorage.setItem("todos",JSON.stringify(newTodo))
        return newTodo
    })
   }
   const handleEdit = (id:string)=>{
    setTodos((prev)=>{
        const editData = prev.filter((filteredData)=> filteredData.id === id);
        setData(editData[0].task)
        const newTodo = prev.filter((filteredTodo)=> filteredTodo.id !== id);
        localStorage.setItem("todos",JSON.stringify(newTodo))
        return newTodo;
    })
   }

   const handleAddName = (value:string)=>{
    localStorage.setItem("nameValue",value)
    setName(value);
   }

    return(
        <todosContext.Provider value={{todos,data,setName,name,handleAddTodo, handleChange, handleDelete, handleEdit, handleAddName, handleNameEdit, handleSelectAll, handleDeleteAll}}>
            {children}
        </todosContext.Provider>
    )
}


export const useTodos = ()=>{
    const todosConsumer = useContext(todosContext);

    if(!todosConsumer){
        throw new Error("useTodos used outside of provider")
    }

    return todosConsumer;
}

