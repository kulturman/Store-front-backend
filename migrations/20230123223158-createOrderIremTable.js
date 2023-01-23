"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "order_items",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      order_id: {
        type: "int",
        foreignKey: {
          name: "order_items_orders_orders_id_id_id_fk",
          table: "orders",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          mapping: "id",
        },
      },
      user_id: {
        type: "int",
        foreignKey: {
          name: "order_items_orders_users_id_id_id_fk",
          table: "users",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          mapping: "id",
        },
      },
      quantity: { type: "int" },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("order_items", callback);
};

exports._meta = {
  version: 1,
};
