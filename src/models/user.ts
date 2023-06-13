import { Sequelize, Model, NUMBER, STRING } from 'sequelize';
import { DBType } from './db';

interface UserType {
  id?: number;
  nickname: string;
  kakaoId: string;
}

class User extends Model<UserType> {
  declare id: number;
  declare nickname: string;
  declare kakaoId: string;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: NUMBER,
          autoIncrement: true,
          primaryKey: true,
        },
        nickname: {
          type: STRING,
        },
        kakaoId: {
          type: STRING,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        timestamps: false,
        freezeTableName: true, // 테이블명 변경 불가
      }
    );
  }

  static associate(db: DBType) {
    db.User.hasMany(db.StoredIngredient, { foreignKey: 'userId' });
  }
}

export default User;
