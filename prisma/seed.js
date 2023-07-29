const { faker } = require('@faker-js/faker');

async function seed(prisma) {
  try {
    const users = [];

    for (let i = 0; i < 20; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      };
      users.push(user);
    }

    await prisma.user.createMany({
      data: users,
    });

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seed;
