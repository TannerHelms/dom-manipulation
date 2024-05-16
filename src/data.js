const htmlData = [
  {
    id: 1,
    type: "div",
    content: null,
    expanded: true,
    style: "border p-4 space-y-6 px-10",
    child: [
      {
        id: 8,
        pid: 1,
        type: "div",
        content: null,
        style: "border p-3 space-y-4 mt-4",
        child: [
          { id: 2, pid: 1, type: "img", src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D", alt: "User Avatar", style: "rounded-full w-24 h-24 mx-auto", onClick: "alert-Hello World" },
          { id: 3, pid: 1, type: "button", content: "Change Avatar", style: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 block mx-auto" },
          { id: 4, pid: 1, type: "input", content: "John Doe", placeholder: "Enter Name", style: "border border-gray-400 rounded w-full py-2 px-4 mt-4" },
          { id: 5, pid: 1, type: "input", content: "example@example.com", placeholder: "Enter Email", style: "border border-gray-400 rounded w-full py-2 px-4 mt-4" },
          {
            id: 6,
            pid: 1,
            type: "button",
            content: "Save Changes",
            style: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto",
          },
        ],
      },
      {
        id: 7,
        pid: 1,
        type: "div",
        content: null,
        style: "border p-3 space-y-4 mt-4",
        child: [
          { id: 8, pid: 7, type: "button", content: "Change Password", style: "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full block mx-auto" },
          { id: 9, pid: 7, type: "button", content: "Delete Account", style: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full block mx-auto" },
        ],
      },
    ],
  },
];



export default htmlData;