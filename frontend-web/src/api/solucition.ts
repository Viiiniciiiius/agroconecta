import { CreateSolutionForm, UpdateSolutionForm } from '../types/solution';

const URL_API = 'http://localhost:2022/solution';

export const getSolutions = async () => {
    const response = await fetch(URL_API);
    const data = await response.json();
    return data;
};

export const getSolution = async (id: string) => {
    const response = await fetch(`${URL_API}/${id}`);
    const data = await response.json();
    return data;
};

export const createSolution = async (solution: CreateSolutionForm) => {
    const response = await fetch(`${URL_API}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
    });
    const data = await response.json();
    return data;
};

export const updateSolution = async (id: string, solution: UpdateSolutionForm) => {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
    });
    const data = await response.json();
    return data;
};

export const deleteSolution = async (id: string) => {
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
};