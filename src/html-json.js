export default function htmlToJson(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    let idCounter = 1;

    function traverse(node) {
        const obj = {
            id: idCounter++,
            type: node.nodeName.toLowerCase(),
            content: node.textContent.trim() || null,
            style: node.getAttribute('className') || null,
        };

        if (node.nodeName.toLowerCase() === 'img') {
            obj.src = node.getAttribute('src');
            obj.alt = node.getAttribute('alt');
        }

        if (node.nodeName.toLowerCase() === 'button') {
            obj.content = node.textContent.trim();
        }

        if (node.nodeName.toLowerCase() === 'input') {
            obj.placeholder = node.getAttribute('placeholder');
        }

        if (node.childNodes.length > 0) {
            obj.subChild = Array.from(node.childNodes)
                .filter(child => child.nodeType === Node.ELEMENT_NODE)
                .map(traverse);
        }

        return obj;
    }

    const result = traverse(doc.body.firstChild);
    return [result];
}

