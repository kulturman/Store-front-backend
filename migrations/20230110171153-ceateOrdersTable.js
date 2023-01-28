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
    "orders",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      userId: {
        type: "int",
        foreignKey: {
          name: "orders_users_userId_id_fk",
          table: "users",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          mapping: "id",
        },
      },
      status: { type: "string", length: 10 },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("orders", callback);
};

exports._meta = {
  version: 1,
};
