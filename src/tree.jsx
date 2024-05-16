import * as React from "react";
import * as ReactDOM from "react-dom";
import { enableRipple } from "@syncfusion/ej2-base";
import htmlData from "./data2";
enableRipple(true);
import {
  TreeViewComponent,
  ContextMenuComponent,
} from "@syncfusion/ej2-react-navigations";
function Tree() {
  let menuObj;
  let treeObj;
  // Mapping TreeView fields property with data source properties
  let fields = {
    dataSource: htmlData,
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
    { text: "Rename Item" },
    { text: "Remove Item" },
  ];
  let index = 1;
  function menuclick(args) {
    let targetNodeId = treeObj.selectedNodes[0];
    if (args.item.text == "Add New Item") {
      let nodeId = "tree_" + index;
      let item = { id: nodeId, name: "New Folder" };
      treeObj.addNodes([item], targetNodeId, null);
      index++;
      htmlData.push(item);
      treeObj.beginEdit(nodeId);
    } else if (args.item.text == "Remove Item") {
      treeObj.removeNodes([targetNodeId]);
    } else if (args.item.text == "Rename Item") {
      treeObj.beginEdit(targetNodeId);
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
    <div className="control-pane">
      <div className="control-section">
        <div className="control_wrapper">
          <div id="tree">
            {" "}
            {/* Render TreeView */}
            <TreeViewComponent
              fields={fields}
              allowDragAndDrop={true}
              ref={(treeview) => {
                treeObj = treeview;
              }}
              nodeClicked={nodeclicked.bind(this)}
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
  );
}
export default Tree;
