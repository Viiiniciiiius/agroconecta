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
      `db settings: ${process.env.MONGO_HOST}, ${process.env.MONGO_DBNAME}, ${process.env.MONGO_USER}`,
    );
    await mongoose.connect(process.env.MONGO_HOST!, {
      dbName: process.env.MONGO_DBNAME,
    });    
    fastify.decorate('mongoose', mongoose);
    console.log('MongoDB connected successfully');
  } catch (error) {
    fastify.log.error('Error connecting to MongoDB');
    fastify.log.error(error);
    throw error;
  }
}

/**
 * Wrapped plugin with fastify-plugin to share decorators across scope
 *
 * @type {FastifyPluginAsync}
 */
export default fp(mongoosePlugin);
