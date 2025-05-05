import { CreateSolutionForm } from '../types/solution';

const API_URL = 'http://localhost:2023/solution';

export const getSolutions = async (category: string) => {

    const response = await fetch(`${API_URL}?category=${encodeURIComponent(category)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export const getSolution = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
};

export const createSolution = async (solution: CreateSolutionForm) => {
    const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
    });
    const data = await response.json();
    return data;
};

export const deleteSolution = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
};