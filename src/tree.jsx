import { enableRipple } from "@syncfusion/ej2-base";
import {
  ContextMenuComponent,
  TreeViewComponent,
} from "@syncfusion/ej2-react-navigations";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "./redux/renderSlice";
import { htmlData } from "./data2";

const data = JSON.parse(JSON.stringify(htmlData));
enableRipple(true);
function Tree() {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  //   const htmlData = useSelector((state) => state.render.value);
  let menuObj;
  let treeObj;
  // Mapping TreeView fields property with data source properties
  let fields = {
    dataSource: data,
    id: "id",
    parentID: "pid",
    text: "type",
    child: "subChild",
    htmlAttributes: "hasAttribute",
    content: "content",
    style: "style",
    hasChildren: "hasChild",
    selected: "isSelected",
  };
  function nodeclicked(args) {
    if (args.event.which === 3) {
      treeObj.selectedNodes = [args.node.getAttribute("data-uid")];
    }
  }
  //Render the context menu with target as Treeview
  let menuItems = [
    { text: "Add New Item" },
    { text: "Edit Item" },
    { text: "Rename Item" },
    { text: "Remove Item" },
  ];
  let index = 1;

  function create(formData) {
    formData.preventDefault();
    const type = formData.target.elements.type.value;
    const style = formData.target.elements.style.value;
    const content = formData.target.elements.content.value;
    setModal(false);
    let targetNodeId = treeObj.selectedNodes[0];
    let nodeId = "tree_" + index;
    let item = {
      pid: 1,
      id: 7,
      type,
      style,
      content: content.trim() == "" ? null : content,
    };
    treeObj.addNodes([item], targetNodeId, null);
    index++;
    data.push(item);
    treeObj.beginEdit(nodeId);
  }

  function menuclick(args) {
    console.log(args);
    let targetNodeId = treeObj.selectedNodes[0];
    if (args.item.text == "Add New Item") {
      setModal(true);
    } else if (args.item.text == "Remove Item") {
      treeObj.removeNodes([targetNodeId]);
    } else if (args.item.text == "Rename Item") {
      treeObj.beginEdit(targetNodeId);
    } else if (args.item.text == "Edit Item") {
      let node = treeObj.getTreeData(targetNodeId);
      console.log(node);
    }
  }
  function beforeopen(args) {
    let targetNodeId = treeObj.selectedNodes[0];
    let targetNode = document.querySelector(
      '[data-uid="' + targetNodeId + '"]'
    );
    if (targetNode.classList.contains("remove")) {
      menuObj.enableItems(["Remove Item"], false);
    } else {
      menuObj.enableItems(["Remove Item"], true);
    }
    if (targetNode.classList.contains("rename")) {
      menuObj.enableItems(["Rename Item"], false);
    } else {
      menuObj.enableItems(["Rename Item"], true);
    }
  }
  return (
    <>
      {modal && (
        <div className="fixed bg-gray-200/50 left-0 right-0 top-0 bottom-0 z-10 ">
          <div className="fixed z-50 bg-white -translate-y-1/2  -translate-x-1/2 left-1/2 top-1/4 flex flex-col space-y-4 p-4 rounded-xl">
            <p className="text-center text-lg font-bold">Create Componet</p>
            <form onSubmit={create} className="w-full space-y-4">
              <input
                autoComplete="off"
                name="type"
                type="text"
                placeholder="Enter Type"
                className="border border-gray-400 rounded w-full py-2 px-4 mt-4"
              />
              <input
                autoComplete="off"
                name="style"
                type="text"
                placeholder="Enter Tailwind Style"
                className="border border-gray-400 rounded w-full py-2 px-4 mt-4"
              />
              <input
                autoComplete="off"
                name="content"
                type="text"
                placeholder="Enter Content"
                className="border border-gray-400 rounded w-full py-2 px-4 mt-4"
              />

              <button
                className="bg-blue-400 text-white rounded-xl py-2 px-4 w-full"
                type="submit"
              >
                Create
              </button>
              <button
                className="bg-red-400 text-white rounded-xl py-2 px-4 w-full"
                type="button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="control-pane">
        <div className="control-section">
          <div className="control_wrapper">
            <div id="tree">
              {/* Render TreeView */}
              <TreeViewComponent
                fields={fields}
                allowDragAndDrop={true}
                ref={(treeview) => {
                  treeObj = treeview;
                }}
                nodeClicked={nodeclicked.bind(this)}
                dataSourceChanged={(v) =>
                  dispatch(setValue({ data: JSON.stringify(v.data) }))
                }
              />
              <ContextMenuComponent
                id="contentmenutree"
                target="#tree"
                items={menuItems}
                beforeOpen={beforeopen.bind(this)}
                select={menuclick.bind(this)}
                ref={(contextmenu) => {
                  menuObj = contextmenu;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tree;
