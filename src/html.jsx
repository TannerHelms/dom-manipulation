export default function Html() {
  return (
    <div className="p-4 bg-gray-200 rounded-xl items-center flex flex-col space-y-5">
      <div className="flex flex-row justify-between w-full items-center">
        <p className="text-sm text-gray-500">2 days ago</p>
        <p>view</p>
      </div>
      <img
        className="aspect-square object-cover rounded-full size-28"
        src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="placeholder"
      />
      <div className="flex flex-row justify-between w-full">
        <p className="text-lg font-bold mt-4">John Doe</p>
        <p className="text-lg font-bold mt-4">29</p>
      </div>
      <p className="text-sm font-bold text-gray-500">JohnDoe@gmail.com</p>
      <button className="bg-blue-500 text-white">View Profile</button>
    </div>
  );
}
