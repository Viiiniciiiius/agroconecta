/**
 * @fileoverview MongoDB connection plugin for Fastify
 * Manages database connection lifecycle and provides Mongoose instance decoration
 */

import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

/**
 * Initializes MongoDB connection and decorates Fastify instance with Mongoose
 *
 * @throws {Error} If connection to MongoDB fails
 *
 * @requires process.env.MONGO_HOST - MongoDB connection string
 * @requires process.env.MONGO_DBNAME - Database name
 * @requires process.env.MONGO_USER - MongoDB username
 * @requires process.env.MONGO_PWD - MongoDB password
 *
 */
async function mongoosePlugin(fastify: FastifyInstance) {
  try {
    console.log('Connecting to MongoDB...');
    fastify.log.info(
      `db settings: ${process.env.MONGO_HOST}`,
    );

    // Add a timeout to prevent hanging
    const connectionPromise = mongoose.connect(process.env.MONGO_HOST);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 10000) // 10 seconds timeout
    );

    await Promise.race([connectionPromise, timeoutPromise]);

    fastify.decorate('mongoose', mongoose);
    console.log('MongoDB connected successfully');
  } catch (error) {
    fastify.log.error('Error connecting to MongoDB');
    fastify.log.error(error);
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}

/**
 * Wrapped plugin with fastify-plugin to share decorators across scope
 *
 * @type {FastifyPluginAsync}
 */
export default fp(mongoosePlugin);
