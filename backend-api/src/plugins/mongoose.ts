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
 *
 */
async function mongoosePlugin(fastify: FastifyInstance) {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    if (!process.env.MONGO_HOST) {
      throw new Error('MONGO_HOST environment variable is not set');
    }
    
    fastify.log.info(`Database URL: ${process.env.MONGO_HOST.replace(/\/\/.*@/, '//***:***@')}`);

    // Configure mongoose options for Atlas
    const mongooseOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      retryWrites: true
    };

    // Connect with better error handling
    await mongoose.connect(process.env.MONGO_HOST, mongooseOptions);

    // Test the connection
    await mongoose.connection.db.admin().ping();
    
    fastify.decorate('mongoose', mongoose);
    console.log('✅ MongoDB Atlas connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ Error connecting to MongoDB Atlas:', error);
    fastify.log.error('Error connecting to MongoDB Atlas:', error);
    
    // Provide helpful error messages
    if (error.message.includes('whitelist')) {
      console.error('💡 Tip: Add your IP to MongoDB Atlas Network Access whitelist');
      console.error('   Your current IP: 45.166.22.254');
    }
    
    throw error;
  }
}

/**
 * Wrapped plugin with fastify-plugin to share decorators across scope
 *
 * @type {FastifyPluginAsync}
 */
export default fp(mongoosePlugin);
