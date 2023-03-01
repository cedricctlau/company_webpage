import { type Knex } from "knex";
import AdminService from "../../src/routes/adminService";

describe("Testing admin service", () => {
  it("can create title", async () => {
    const mKnex = jest.fn(() => {
      class K {
        title: string;
        department_id: number;
        constructor() {
          this.title = "";
          this.department_id = 0;
        }
        insert = jest.fn((title: string, department_id: number) => {
          this.title = title;
          this.department_id = department_id;
          return this;
        });
        returning = jest
          .fn()
          .mockResolvedValue([{ id: 5, title, department_id }]);
      }
      return new K();
    }) as any as Knex;
    const s = new AdminService(mKnex);

    const title = "title";
    const department_id = 3;
    const result = await s.createTitle(title, department_id);
    expect(result).toEqual({
      success: true,
      outcome: { created: { id: 5, title: "title", department_id: 3 } },
    });
  });
});
