import { enableRipple } from "@syncfusion/ej2-base";
enableRipple(true);
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { useEffect, useState } from "react";
import htmlData from "./data";
import Tree from "./tree";

export default function App() {
  const [html, setHtml] = useState({ data: htmlData });
  const [render, setRender] = useState(null);

  function ToHtml(content) {
    const el = document.createElement(content.type);
    if (content.style) el.className = content.style;
    if (content.src) el.src = content.src;
    content.child.forEach((c) => {
      if (c.content) {
        const el2 = document.createElement(c.type);
        el2.innerHTML += c.content;
        if (c.style) el2.className = c.style;
        if (c.placeholder) el2.placeholder = c.placeholder;
        if (c.src) el2.src = c.src;
        el.appendChild(el2);
      } else if (c.child) {
        el.appendChild(ToHtml(c));
      } else if (c.type === "img") {
        const el2 = document.createElement(c.type);
        el2.src = c.src;
        el2.alt = c.alt;
        if (c.style) el2.className = c.style;
        el.appendChild(el2);
      }
    });
    return el;
  }

  useEffect(() => {
    setRender(ToHtml(html.data[0]));
  }, [html]);

  let fields = {
    dataSource: htmlData,
    id: "id",
    parentID: "pid",
    text: "type",
    content: "content",
    style: "style",
    hasChildren: "hasChild",
    selected: "isSelected",
  };
  let allowDragAndDrop = true;

  return (
    <>
      <div className="grid grid-cols-2 h-full">
        <div className="border-r-2 border-gray-400 ">
          <TreeViewComponent
            fields={fields}
            allowDragAndDrop={allowDragAndDrop}
            dataSourceChanged={(v) => setHtml({ data: v.data })}
          />
        </div>
        {render && (
          <div
            dangerouslySetInnerHTML={{ __html: nodeToString(render) }}
            className="m-4"
          />
        )}
      </div>
      <Tree />
    </>
  );
}

function nodeToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}
