import mongoose from 'mongoose';
import {
  CreateSolutionRequest,
  DeleteSolutionRequest,
  GetSolutionsRequest,
  GetSolutionByIdRequest,
} from 'routes/solution/solution.types';
import { ISolution, SolutionModel } from 'models/solution';

/**
 * Creates a new solution.
 * @param {Partial<ISolution>} solutionData - The solution data.
 * @returns {Promise<ISolution>} The created solution.
 */
export const createSolution = async (solutionData: CreateSolutionRequest): Promise<ISolution> => {
  const newSolution = new SolutionModel(solutionData);
  await newSolution.save();
  return newSolution;
};

/**
 * Retrieves all solutions.
 * @returns {Promise<ISolution[]>} The list of solutions.
 */
export const getSolutions = async (): Promise<ISolution[]> => {
  const solutions = await SolutionModel.find();
  return solutions.map((solution: ISolution) => {
    const solutionObject = solution.toObject();
    return {
      ...solutionObject,
      publishDate: solutionObject.publishDate instanceof Date
        ? solutionObject.publishDate.toISOString()
        : null,
    };
  });
};

/**
 * Retrieves a single solution by ID.
 * @param {string} _id - The solution ID.
 * @returns {Promise<ISolution | null>} The solution or null if not found.
 */
export const getSolutionById = async (_id: string): Promise<ISolution | null> => {
  return await SolutionModel.findById(_id);
};

/**
 * Deletes a solution by ID.
 * @param {string} _id - The solution ID.
 * @returns {Promise<ISolution | null>} The deleted solution or null if not found.
 */
export const deleteSolution = async (_id: string): Promise<ISolution | null> => {
  return await SolutionModel.findByIdAndDelete(_id);
};
