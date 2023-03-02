type Ancmt = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  staff_id: number;
};

export type DeptAncmt = {
  id: number;
  department_id: number;
  announcement_id: number;
};

export type TeamAncmt = {
  id: number;
  team_id: number;
  announcement_id: number;
};

export default Ancmt;
