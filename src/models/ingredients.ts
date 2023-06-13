import { Sequelize, Model, NUMBER, STRING } from 'sequelize';
import User from './user';
import { DBType } from './db';

// 식재료 보관 장소

type StorageArea = 'freezer' | 'fridge' | 'roomTemp';

interface StoredIngredientType {
  id?: number;
  name: string;
  category: string;
  userId: number;
  storageArea: StorageArea;
  count: number;
  expirationDate: string;
}

class StoredIngredient extends Model<StoredIngredientType> {
  declare id: number;
  declare name: string;
  declare category: string;
  declare userId: number;

  declare storageArea: StorageArea;
  declare count: number;
  declare expirationDate: string;

  static initModel(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: NUMBER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: STRING,
        },
        category: {
          type: STRING,
        },
        storageArea: {
          type: STRING,
        },
        count: {
          type: NUMBER,
        },
        expirationDate: {
          type: STRING,
        },
      },
      {
        sequelize,
        modelName: 'StoredIngredient',
        tableName: 'StoredIngredient',
        timestamps: false,
        freezeTableName: true, // 테이블명 변경 불가
      }
    );
  }
  static associate(db: DBType) {
    db.StoredIngredient.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
}

export default StoredIngredient;
