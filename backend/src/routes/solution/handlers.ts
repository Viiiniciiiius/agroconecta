/**
 * @fileoverview Solution route handlers for creating, updating, and deleting solutions
 * Implements request handling for solution management endpoints
*/
import { FastifyRequest, FastifyReply } from 'fastify';
import {
    createSolution,
    updateSolution,
    deleteSolution,
    getSolutions,
    getSolutionById,
} from 'controllers/solutionController';
import {
    CreateSolutionRequest,
    UpdateSolutionRequest,
    DeleteSolutionRequest,
    GetSolutionsRequest,
    GetSolutionByIdRequest,
} from './solution.types';

/**
 * Handles solution retrieval requests
 */
export async function getSolutionsHandler(
    request: FastifyRequest<{ Params: GetSolutionsRequest }>,
    reply: FastifyReply,
) {
    try {
        const solution = await getSolutions();
        reply.code(200).send(solution);
    } catch (error) {
        reply.code(404).send({ error: error.message });
    }
}

/**
 * Handles solution retrieval requests
 */
export async function getSolutionByIdHandler(
    request: FastifyRequest<{ Params: GetSolutionByIdRequest }>,
    reply: FastifyReply,
) {
    try {
        const solution = await getSolutionById(request.params._id);
        reply.code(200).send(solution);
    } catch (error) {
        reply.code(404).send({ error: error.message });
    }
}

/**
 * Handles solution creation requests
*/
export async function createSolutionHandler(
    request: FastifyRequest<{ Querystring: CreateSolutionRequest }>,
    reply: FastifyReply,
) {
    try {
        const solution = await createSolution(request.body);
        reply.code(201).send(solution);
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
}

/**
 * Handles solution update requests
 */
export async function updateSolutionHandler(
    request: FastifyRequest<{ Params: UpdateSolutionRequest['params'], Body: UpdateSolutionRequest['body'] }>,
    reply: FastifyReply,
) {
    try {
        const solution = await updateSolution(request.params._id, request.body);
        reply.code(200).send(solution);
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
}

/**
 * Handles solution deletion requests
 */
export async function deleteSolutionHandler(
    request: FastifyRequest<{ Params: DeleteSolutionRequest }>,
    reply: FastifyReply,
) {
    try {
        await deleteSolution(request.params._id);
        reply.code(204).send();
    } catch (error) {
        reply.code(400).send({ error: error.message });
    }
}