type Ancmt = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  staff_id: number;
  is_public: boolean;
};

export type DeptAncmt = {
  id: number;
  dept_id: number;
  ancmt_id: number;
};

export type TeamAncmt = {
  id: number;
  team_id: number;
  ancmt_id: number;
};

export default Ancmt;
