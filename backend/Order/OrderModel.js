import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from '../User/UserModel.js';
import Product from '../Product/ProductModel.js';
import Cdrink from '../Cdrink/CdrinkModel.js'; // Импорт модели Cdrink

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  }
);

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CDrink_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Мы допускаем, что OrderItem может быть с продуктом или кастомным напитком
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
  }
);

// Ассоциации
Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'items', // Убедитесь, что `as` совпадает с тем, что используете в `include`
  onDelete: 'CASCADE',
});

OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order', // Этот `as` может не использоваться в данном случае
  onDelete: 'CASCADE',
});

OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product', // Связь с продуктами
  onDelete: 'CASCADE',
});

OrderItem.belongsTo(Cdrink, {
  foreignKey: 'CDrink_id',
  as: 'Cdrink', // Связь с кастомным напитком
  onDelete: 'CASCADE',
});

Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'orderItems', // Если нужно использовать в include
  onDelete: 'CASCADE',
});

Cdrink.hasMany(OrderItem, {
  foreignKey: 'CDrink_id',
  as: 'orderItems', // Связь с кастомным напитком в order_items
  onDelete: 'CASCADE',
});

export { Order, OrderItem };
