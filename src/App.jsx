import Render from "./render";
import Tree from "./tree";

export default function App() {
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
