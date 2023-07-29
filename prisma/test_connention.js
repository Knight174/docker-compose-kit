async function testDatabaseConnection(prisma) {
  try {
    await prisma.$connect();
    console.log('Database connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = testDatabaseConnection;
