// Quick script to clear users collection for development
// Run with: node clear-users.js

const { MongoClient } = require('mongodb');

async function clearUsers() {
  const uri = process.env.MONGODB_URI || 'your-mongodb-connection-string';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('test'); // or your database name
    const collection = db.collection('users');

    // Drop the entire collection (this removes all data and indexes)
    await collection.drop();
    console.log('Users collection dropped successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

clearUsers();
