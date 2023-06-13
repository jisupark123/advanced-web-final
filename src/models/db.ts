import { Sequelize } from 'sequelize';
import config from './config';
import User from './user';
import StoredIngredient from './ingredients';

export interface DBType {
  sequelize: Sequelize;
  User: typeof User;
  StoredIngredient: typeof StoredIngredient;
}

// Sequelize 객체 생성 - mysql의 DB와 연결할 수 있는 객체
export const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: 3306,
    dialect: 'mysql',
    timezone: '+09:00',
    dialectOptions: { charset: 'utf8mb4', dateStrings: true, typeCast: true },
    define: {
      timestamps: false,
    },
  }
);

const db: DBType = {
  sequelize,
  User,
  StoredIngredient,
};

db.User.initModel(sequelize);
db.StoredIngredient.initModel(sequelize);
db.User.associate(db);
db.StoredIngredient.associate(db);
export default db;

// User.initModel(sequelize);
