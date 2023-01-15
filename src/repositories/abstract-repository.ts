import client from "./db";

export abstract class AbstractRepository <T> {
    async getAll(page: number = 1, limit: number = 10): Promise<{ data: Array<T>, meta: { numberOfPages: number, totalRows: number } }> {
        const { rows } = await client.query(`SELECT COUNT(*) FROM ${this.getTableName()}`);
        const numberOfPages = Math.ceil(rows[0].count / limit);

        const { rows: data, rowCount: totalRows } = await client.query(
            `SELECT * FROM ${this.getTableName()} ORDER BY id ASC LIMIT $1 OFFSET $2`,
            [limit, (page - 1) * limit]
        );
        
        return { data, meta: { numberOfPages, totalRows}};
    }

    abstract create(t: T): Promise<boolean>;
    
    findOne(id: number): Promise<T> {
        return client.query(`SELECT * FROM ${this.getTableName()} WHERE id = $1`, [id])
            .then(res => {
                if (res.rows[0]) {
                    return Promise.resolve(this.mapToEntity(res.rows[0]));
                }
                return Promise.reject('Record not found');
            });
    }

    //I cannot really do better, as database row may be anithing
    abstract mapToEntity(row: any): T;
    abstract getTableName(): string;
}