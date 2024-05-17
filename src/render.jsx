import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Render() {
  const html = useSelector((state) => state.render.value);

  const [render, setRender] = useState(null);
  function ToHtml(content) {
    console.log(content);
    const el = document.createElement(content.type);
    if (content.style) el.className = content.style;
    if (content.src) el.src = content.src;
    content.subChild.forEach((c) => {
      if (c.content) {
        const el2 = document.createElement(c.type);
        el2.innerHTML += c.content;
        if (c.style) el2.className = c.style;
        if (c.placeholder) el2.placeholder = c.placeholder;
        if (c.src) el2.src = c.src;
        el.appendChild(el2);
      } else if (c.subChild) {
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
    if (!html) {
      setRender(ToHtml(htmlData[0]));
    } else {
      setRender(ToHtml(html[0]));
    }
  }, [html]);

  return (
    render && (
      <div
        dangerouslySetInnerHTML={{ __html: nodeToString(render) }}
        className="m-4"
      />
    )
  );
}

function nodeToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}
