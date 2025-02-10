// models/CdrinkModel.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Cdrink extends Model {}

Cdrink.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Cdrink',
    tableName: 'cdrinks',
    timestamps: false, // если не нужно отслеживание времени создания и обновления
    indexes: [{ fields: ['name'], unique: true }],
  }
);

export default Cdrink;
