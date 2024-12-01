const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-55 min-h-screen p-4">
      <nav>
        <ul>
          <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Home</a></li>
          <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Analytics</a></li>
          <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Reports</a></li>
          <li className="mb-2"><a href="#" className="block p-2 hover:bg-gray-700 rounded">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;