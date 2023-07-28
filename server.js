require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const seed = require('./prisma/seed');
const testDatabaseConnection = require('./prisma/test_connention');

const prisma = new PrismaClient({ log: ['query'] });
testDatabaseConnection(prisma);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Docker Compose!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'no name or email',
    });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/seed', async (req, res) => {
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

    res.send('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.listen(process.env.PORT, async () => {
  console.log('Server is running on port ' + process.env.PORT);

  // if (process.env.NODE_ENV === 'development') {
  // 在服务器启动时运行 seed 文件
  try {
    const existingUsers = await prisma.user.count();

    if (existingUsers === 0) {
      await seed(prisma);
    }
  } catch (error) {
    console.error('Error running seed:', error);
  }
  // }
});
