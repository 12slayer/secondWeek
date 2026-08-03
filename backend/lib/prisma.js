const { PrismaClient } = require('@prisma/client');

// One shared PrismaClient instance for the whole app — this is the
// equivalent of a Mongoose model, but for all your tables at once.
// (Creating a new PrismaClient per request would exhaust database
// connections, so this file exists purely so every other file can
// import the same instance.)
const prisma = new PrismaClient();

module.exports = prisma;
