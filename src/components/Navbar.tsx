import { Link, useSearchParams } from "react-router-dom"


const Navbar = () => {

    const [searchParams] = useSearchParams();
    const data = searchParams.get("todos");

  return (
    <nav className="flex justify-between p-3">
      <Link className={`${data===null? "bg-green-700 text-white":''} w-full transition-colors duration-300 ease-out rounded-lg text-center `} to="/">All</Link>
      <Link className={`${data==="active"? "bg-green-700 text-white":''} w-full transition-colors duration-300 ease-out rounded-lg text-center `} to="/?todos=active">Active</Link>
      <Link className={`${data==="completed"? "bg-green-700 text-white":''} w-full transition-colors duration-300 ease-out rounded-lg text-center `} to="/?todos=completed">Completed</Link>
    </nav>
  )
}

export default Navbar
