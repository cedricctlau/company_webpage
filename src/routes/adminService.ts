import { Knex } from "knex";
import Dept from "../models/dept";
import Reply from "../models/reply";
import Title from "../models/title";

class AdminService {
  constructor(private knex: Knex) {}

  createTitle = async (
    title: string,
    department_id: number
  ): Promise<Reply> => {
    const qryResult = await this.knex<Title>("titles")
      .insert({ title, department_id })
      .returning("*");
    return { success: true, outcome: { created: qryResult[0] } };
  };

  editTitle = async (
    id: number,
    title: string,
    department_id: number
  ): Promise<Reply> => {
    const qryResult = await this.knex<Title>("titles")
      .where("id", id)
      .update({ title, department_id })
      .returning("*");
    return { success: true, outcome: { updated: qryResult[0] } };
  };

  createDepartment = async (department: string): Promise<Reply> => {
    const qryResult = await this.knex<Dept>("departments")
      .insert({ dept: department })
      .returning("*");
    return { success: true, outcome: { created: qryResult[0] } };
  };

  editDepartment = async (id: number, department: string): Promise<Reply> => {
    const qryResult = await this.knex<Dept>("departments")
      .where("id", id)
      .update({ dept: department })
      .returning("*");
    return { success: true, outcome: { updated: qryResult[0] } };
  };
}

export default AdminService;
