import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from '../User/UserModel.js';
import Product from '../Product/ProductModel.js';

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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'registration', // Устанавливаем дефолтное значение для статуса
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
      allowNull: false,
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
Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
  as: 'orderItems', // Если нужно использовать в include
  onDelete: 'CASCADE',
});

export { Order, OrderItem };
