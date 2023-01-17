import client from "./db";

export abstract class AbstractRepository <T extends Record<string, any>> {
    async getAll(page: number = 1, limit: number = 10): Promise<{ data: Array<T>, meta: { numberOfPages: number, totalRows: number } }> {
        const { rows } = await client.query(`SELECT COUNT(*) FROM ${this.getTableName()}`);
        const numberOfPages = Math.ceil(rows[0].count / limit);

        const { rows: data } = await client.query(
            `SELECT * FROM ${this.getTableName()} ORDER BY id ASC LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
        );
        
        return { data, meta: { numberOfPages, totalRows: +rows[0].count } };
    }

    async create(t: T): Promise<boolean> {
        const { query, values } = this.generateCreateQuery(t);

        return client.query(query, values)
        .then(res => {
            if (res.rowCount > 0) {
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        }); 
    }

    generateCreateQuery(t: T): {
        query: string,
        values: Array<any>
    } {
        //This is less efficient but short and cleaner
        const validColumns = Object.keys(Object(t)).sort().filter(column => !t['id'] ? column !== 'id' : true);
        const columnsNames = validColumns.map(column => `"${column}"`).join(', ');
        const values = validColumns.map(column => t[column]);
        const columnsPlaceHolders = validColumns.map((column, index) => `\$${index + 1}`).join(', ');

        const query = `INSERT INTO ${this.getTableName()} (${columnsNames}) VALUES(${columnsPlaceHolders})`;

        return {
            query,
            values: values
        };
    }
    
    findOne(id: number): Promise<T | null> {
        return client.query(`SELECT * FROM ${this.getTableName()} WHERE id = $1`, [id])
            .then(res => {
                if (res.rows[0]) {
                    return Promise.resolve(this.mapToEntity(res.rows[0]));
                }
                return Promise.resolve(null);
            });
    }

    delete(id: number): Promise<boolean> {
        return client.query(`DELETE FROM ${this.getTableName()} WHERE id = $1`, [id])
            .then(res => {
                if (res.rowCount > 0) {
                    return Promise.resolve(true);
                }
                return Promise.resolve(true);
            }); 
    }

    //I cannot really do better, as database row may be anithing
    abstract mapToEntity(row: any): T;
    abstract getTableName(): string;
}