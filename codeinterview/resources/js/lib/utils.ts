import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
const API_URL = 'http://localhost:8000/api/users';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // ✅ Now `getUsers()` returns an array
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // ✅ Always return an array
    }
};

export const addUser = async (fullName: string) => {
    await axios
        .post(API_URL, { full_name: fullName })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            return error?.message || 'An unexpected error occurred. Please try again.';
        });
};

export const updateUser = async (id: number, fullName: string) => {
    await axios
        .put(`${API_URL}/${id}`, { full_name: fullName })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            return error?.message || 'An unexpected error occurred. Please try again.';
        });
};

export const deleteUser = async (id: number) => {
    await axios
        .delete(`${API_URL}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('Error adding user:', error);
        });
};
