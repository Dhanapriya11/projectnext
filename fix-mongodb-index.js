// Run this script to fix the MongoDB index issue
// You can run this with: node fix-mongodb-index.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function fixIndex() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    return;
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('test'); // or your database name
    const collection = db.collection('users');

    // List current indexes
    console.log('Current indexes:');
    const indexes = await collection.indexes();
    console.log(indexes);

    // Drop the problematic username index
    try {
      await collection.dropIndex('username_1');
      console.log('Successfully dropped username_1 index');
    } catch (error) {
      console.log('Index might not exist or already dropped:', error.message);
    }

    // Optionally, remove any documents with null username
    const result = await collection.deleteMany({ username: null });
    console.log(`Removed ${result.deletedCount} documents with null username`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixIndex();
