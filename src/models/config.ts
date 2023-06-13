import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: 'root',
    // password: process.env.DATABASE_PASSWORD,
    password: 'a00366###',
    database: 'mocum',
    host: 'mobile-computing-project.corp5o5kywm1.ap-northeast-2.rds.amazonaws.com',
  },
};

export default config;
