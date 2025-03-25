import Modal from '@/components/Modal';
import { addUser, deleteUser, getUsers, updateUser } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface UserType {
    id: number;
    full_name: string;
    result: string;
}
export default function Welcome() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>('');
    const [editId, setEditId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchUsers = async () => {
        setIsLoading(true);

        const data = await getUsers();
        setUsers(data);
        setIsLoading(false);
    };
    const handleDelete = async (id: number) => {
        await deleteUser(id);
        fetchUsers();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate full name
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            console.error('Invalid name! Only letters allowed.');
            return;
        }
        if (editId) {
            await updateUser(editId, fullName);
            setEditId(null);
        } else {
            await addUser(fullName);
        }

        setFullName('');
        fetchUsers();
    };
    const handleUpdate = async () => {
        if (editId !== null) {
            await updateUser(editId, fullName);
            setIsModalOpen(false);
            fetchUsers();
        }
    };
    const openModal = (id: number, name: string) => {
        setEditId(id);
        setFullName(name);
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
            <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">Full Name Calculator</h1>
                {/* <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-md">
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
                        className="mt-4 w-full cursor-pointer rounded-sm bg-blue-100 py-2 text-blue-800 transition hover:bg-blue-600 hover:text-white"
                    >
                        Add Name
                    </button>
                </form> */}
                <div className="mt-8 w-full max-w-4xl overflow-x-auto font-sans">
                    <table className="w-full rounded-lg bg-white shadow-md">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="sm:text-md px-4 py-3 text-left text-sm">Full Name</th>
                                <th className="sm:text-md px-4 py-3 text-center text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="w-full justify-between">
                                <td className="w-1/2 p-1 text-black">
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter full name"
                                        required
                                        className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    />
                                </td>
                                {/* <td className="w-1/3 text-center"></td> */}
                                <td className="flex w-full items-center justify-center p-2">
                                    <button
                                        onClick={handleSubmit}
                                        className="cursor-pointer justify-end rounded-sm bg-blue-100 px-4 py-2 text-blue-800 transition hover:bg-blue-600 hover:text-white"
                                    >
                                        Add Name
                                    </button>
                                </td>
                            </tr>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="py-4 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : users ? (
                                users.map((user) => (
                                    <tr key={user.id} className="border-b text-black hover:bg-gray-100">
                                        <td className="px-4 py-3">{user.full_name}</td>

                                        <td className="flex justify-center space-x-2 px-4 py-3">
                                            <button
                                                onClick={() => openModal(user.id, user.full_name)}
                                                className="cursor-pointer rounded-sm bg-yellow-300 px-3 py-1 text-black transition hover:bg-yellow-400"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="cursor-pointer rounded-sm bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
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
            <Modal isOpen={isModalOpen} closeModal={closeModal} fullName={fullName} setFullName={setFullName} handleUpdate={handleUpdate} />
        </>
    );
}
