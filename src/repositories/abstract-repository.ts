import { Client } from "pg";
import client from "./db";

interface Filter {
  column: string;
  value: number | string;
}

//Since this should be generic I cannot really do better than any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class AbstractRepository<T extends Record<string, any>> {
  protected db: Client;

  constructor() {
    this.db = client;
  }

  async getAll(
    page = 1,
    limit = 10,
    filter: Filter | null = null
  ): Promise<{
    data: Array<T>;
    meta: { numberOfPages: number; totalRows: number };
  }> {
    const { rows } = await this.db.query(
      `SELECT COUNT(*) FROM ${this.getTableName()} ${
        filter !== null ? ` WHERE "${filter.column}" = '${filter.value}'` : ""
      }`
    );
    const numberOfPages = Math.ceil(rows[0].count / limit);

    const { rows: data } = await this.db.query(
      `SELECT * FROM ${this.getTableName()} ${
        filter !== null ? ` WHERE "${filter.column}" = '${filter.value}'` : ""
      } ORDER BY id ASC LIMIT $1 OFFSET $2`,
      [limit, (page - 1) * limit]
    );

    const entities: Array<T> = [];

    //Map data here
    data.forEach((item) => {
      entities.push(this.mapToEntity(item));
    });

    return {
      data: entities,
      meta: { numberOfPages, totalRows: +rows[0].count },
    };
  }

  async create(t: T): Promise<T> {
    const { query, values } = this.generateCreateQuery(t);
    return this.db.query(query, values).then((res) => {
      return Promise.resolve(this.mapToEntity(res.rows[0]));
    });
  }

  async update(t: T): Promise<boolean> {
    const { query, values } = this.generateUpdateQuery(t);

    return this.db.query(query, values).then((res) => {
      if (res.rowCount > 0) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  }

  generateUpdateQuery(t: T): {
    query: string;
    //Since This is generic I have no choice
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: Array<any>;
  } {
    const validColumns = Object.keys(Object(t))
      .sort()
      .filter((column) => column !== "id");
    const columnsNames = validColumns
      .map((column, index) => `"${column}" = \$${index + 1}`)
      .join(", ");
    const values = validColumns.map((column) => t[column]);

    return {
      query: `UPDATE ${this.getTableName()} SET ${columnsNames} WHERE "id" = \$${
        validColumns.length + 1
      }`,
      values: [...values, t["id"]],
    };
  }

  generateCreateQuery(t: T): {
    query: string;
    //Since This is generic I have no choice
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: Array<any>;
  } {
    //This is less efficient but short and cleaner
    const validColumns = Object.keys(Object(t))
      .sort()
      .filter((column) => (!t["id"] ? column !== "id" : true));
    const columnsNames = validColumns.map((column) => `"${column}"`).join(", ");
    const values = validColumns.map((column) => t[column]);
    const columnsPlaceHolders = validColumns
      .map((column, index) => `\$${index + 1}`)
      .join(", ");

    const query = `INSERT INTO ${this.getTableName()} (${columnsNames}) VALUES(${columnsPlaceHolders}) RETURNING *`;

    return {
      query,
      values: values,
    };
  }

  findOne(id: number): Promise<T | null> {
    return this.db
      .query(`SELECT * FROM ${this.getTableName()} WHERE id = $1`, [id])
      .then((res) => {
        if (res.rows[0]) {
          return Promise.resolve(this.mapToEntity(res.rows[0]));
        }
        return Promise.resolve(null);
      });
  }

  delete(id: number): Promise<boolean> {
    return this.db
      .query(`DELETE FROM ${this.getTableName()} WHERE id = $1`, [id])
      .then((res) => {
        if (res.rowCount > 0) {
          return Promise.resolve(true);
        }
        return Promise.resolve(true);
      });
  }

  //Since mapToEntity is generic I really don't have any choice
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract mapToEntity(row: any): T;
  abstract getTableName(): string;
}
