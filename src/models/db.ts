import { Sequelize } from 'sequelize';

// Sequelize 객체 생성 - mysql의 DB와 연결할 수 있는 객체
const sequelize = new Sequelize({
  database: process.env.DATABASE_URL,
  username: 'root',
  password: process.env.DATABASE_PASSWORD,
});
