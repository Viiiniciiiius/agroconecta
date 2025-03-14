import { ISolution, SolutionModel } from 'models/solution';

/**
 * Creates a new solution.
 * @param {Partial<ISolution>} solutionData - The solution data.
 * @returns {Promise<ISolution>} The created solution.
 */
export const createSolution = async (solutionData: Partial<ISolution>): Promise<ISolution> => {
  const solution = new SolutionModel(solutionData);
  await solution.save();
  return solution;
};

/**
 * Retrieves all solutions.
 * @returns {Promise<ISolution[]>} The list of solutions.
 */
export const getSolutions = async (): Promise<ISolution[]> => {
  return await SolutionModel.find();
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
 * Updates a solution by ID.
 * @param {string} _id - The solution ID.
 * @param {Partial<ISolution>} updateData - The update data.
 * @returns {Promise<ISolution | null>} The updated solution or null if not found.
 */
export const updateSolution = async (_id: string, updateData: Partial<ISolution>): Promise<ISolution | null> => {
  return await SolutionModel.findByIdAndUpdate(_id, updateData, { new: true });
};

/**
 * Deletes a solution by ID.
 * @param {string} _id - The solution ID.
 * @returns {Promise<ISolution | null>} The deleted solution or null if not found.
 */
export const deleteSolution = async (_id: string): Promise<ISolution | null> => {
  return await SolutionModel.findByIdAndDelete(_id);
};
