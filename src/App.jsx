import { useDispatch, useSelector } from "react-redux";
import Render from "./render";
import Tree from "./tree";
import htmlToJson from "./html-json";
import { setValue } from "./redux/renderSlice";

export default function App() {
  const htmlData = useSelector((state) => state.render.value);
  const dispatch = useDispatch();

  function handleSubmit(formData) {
    formData.preventDefault();
    const json = htmlToJson(formData.target.elements[0].value);
    dispatch(setValue({ data: JSON.stringify(json) }));
  }

  if (!htmlData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p>Enter HTML</p>
          <textarea placeholder="add text" className="w-60 h-60 border" />
          <button className="bg-blue-500 text-white">submit</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="border-r-2 border-gray-400 ">
          <Tree />
        </div>
        <Render />
      </div>
    </>
  );
}
