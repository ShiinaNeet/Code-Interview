import { useEffect, useState } from "react";
import { addUser, deleteUser, getUsers, updateUser } from "../libs/utils";
import "./App.css";
import Modal from "../components/modal";

function App() {
  const [users, setUsers] = useState([]);
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(10);
  const [operator, setOperator] = useState("+");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editResult, setEditResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateResult = () => {
    switch (operator) {
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num2 !== 0 ? num1 / num2 : "Error";
      default:
        return num1 + num2;
    }
  };
  const fetchUsers = async () => {
    setIsLoading(true);

    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate full name
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      console.error("Invalid name! Only letters allowed.");
      return;
    }
    if (editId) {
      await updateUser(editId, fullName, calculateResult());
      setEditId(null);
    } else {
      await addUser(fullName, calculateResult());
    }

    setFullName("");
    fetchUsers();
  };
  const handleUpdate = async () => {
    if (editId !== null) {
      console.log("Updating user...", editId, fullName, editResult);
      await updateUser(editId, fullName, editResult);
      setIsModalOpen(false);
      fetchUsers();
    }
  };
  const openModal = (id, name, result) => {
    setEditId(id);
    setFullName(name);
    setEditResult(result);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center ">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Full Name Calculator
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md  bg-blue-100 p-6 text-black shadow-md"
        >
          <div className="w-full flex flex-row mb-4 space-x-2 items-center">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              className="w-full rounded-md border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="px-2 py-1 border rounded-md font-extrabold"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              className="w-full rounded-md border px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            required
            className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-sm bg-white py-2 text-blue-800 transition hover:bg-blue-600 hover:text-white"
          >
            Add Name
          </button>
        </form>
        <div className="mt-8 w-full max-w-4xl overflow-x-auto font-sans">
          <table className="w-full rounded-lg bg-white shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="sm:text-md px-4 py-3 text-center text-sm">
                  Full Name
                </th>
                <th className="sm:text-md px-4 py-3 text-center text-sm">
                  Result
                </th>
                <th className="sm:text-md px-4 py-3 text-center text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : users ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b text-black hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">{user.full_name}</td>
                    <td className="px-4 py-3">{user.result}</td>
                    <td className="flex justify-center space-x-2 px-4 py-3">
                      <button
                        onClick={() =>
                          openModal(user.id, user.full_name, user.result)
                        }
                        className="cursor-pointer rounded-sm bg-yellow-300 px-3 py-1 text-black transition hover:bg-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="cursor-pointer rounded-sm bg-red-600 px-3 py-1 text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fullName={fullName}
        result={editResult}
        setResult={setEditResult}
        setFullName={setFullName}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default App;
