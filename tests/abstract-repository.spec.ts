/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractRepository } from "../src/repositories/abstract-repository";

interface Fake {
  id: number;
  label: string;
  name: string;
  age: 30;
}

class FakeRepository extends AbstractRepository<Fake> {
  create(t: Fake): Promise<Fake> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapToEntity(row: any): Fake {
    throw new Error("Method not implemented.");
  }

  getTableName(): string {
    return "fakes";
  }
}

describe("Abstract repo test", () => {
  const fakeRepository = new FakeRepository();

  test("INSERT statement with no enforced id", () => {
    const fake: Fake = { id: 0, name: "test", label: "fake", age: 30 };

    const { query, values } = fakeRepository.generateCreateQuery(fake);
    expect(query).toEqual(
      'INSERT INTO fakes ("age", "label", "name") VALUES($1, $2, $3) RETURNING *'
    );

    expect(values).toEqual([fake.age, fake.label, fake.name]);
  });

  test("INSERT statement with enforced id", () => {
    const fake: Fake = { id: 2, name: "test", label: "fake", age: 30 };

    const { query, values } = fakeRepository.generateCreateQuery(fake);
    expect(query).toEqual(
      'INSERT INTO fakes ("age", "id", "label", "name") VALUES($1, $2, $3, $4) RETURNING *'
    );

    expect(values).toEqual([fake.age, fake.id, fake.label, fake.name]);
  });

  test("UPDATE statement", () => {
    const fake: Fake = { id: 2, name: "test", label: "fake", age: 30 };

    const { query, values } = fakeRepository.generateUpdateQuery(fake);
    expect(query).toEqual(
      'UPDATE fakes SET "age" = $1, "label" = $2, "name" = $3 WHERE "id" = $4'
    );

    expect(values).toEqual([fake.age, fake.label, fake.name, fake.id]);
  });
});
