import client from "./db";

export abstract class AbstractRepository <T extends Record<string, any>> {
    async getAll(page: number = 1, limit: number = 10): Promise<{ data: Array<T>, meta: { numberOfPages: number, totalRows: number } }> {
        const { rows } = await client.query(`SELECT COUNT(*) FROM ${this.getTableName()}`);
        const numberOfPages = Math.ceil(rows[0].count / limit);

        const { rows: data, rowCount: totalRows } = await client.query(
            `SELECT * FROM ${this.getTableName()} ORDER BY id ASC LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
        );
        
        return { data, meta: { numberOfPages, totalRows}};
    }

    async create(t: T): Promise<boolean> {
        /*const hashedPassword = await bcrypt.hash(user.password, 10);

        return client.query('INSERT INTO users ("firstName", "lastName", username, password) VALUES($1, $2, $3, $4)', [
            user.firstName, user.lastName, user.username, hashedPassword
        ])
        .then(res => {
            if (res.rowCount > 0) {
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        });*/
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
        const validColumns = Object.keys(Object(t)).sort().filter(column => column !== 'id');
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

    //I cannot really do better, as database row may be anithing
    abstract mapToEntity(row: any): T;
    abstract getTableName(): string;
}