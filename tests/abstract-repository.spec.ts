import { AbstractRepository } from "../src/repositories/abstract-repository";

interface Fake {
    id: number;
    label: string;
    name: string;
    age: 30
}

class FakeRepository extends AbstractRepository<Fake> {
    create(t: Fake): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    mapToEntity(row: any): Fake {
        throw new Error("Method not implemented.");
    }

    getTableName(): string {
        return 'fakes';
    }

}

describe('Abstract repo test', () => {
    const fakeRepository = new FakeRepository();
    const fake: Fake = { id: 2, name: 'test', label: 'fake', age: 30};

    test('Select statement', () => {
        const { query, values } = fakeRepository.generateCreateQuery(fake);
        expect(query)
        .toEqual('INSERT INTO fakes ("age", "label", "name") VALUES($1, $2, $3)');

        expect(values).toEqual([fake.age, fake.label, fake.name])
    })
})