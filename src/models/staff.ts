import Gender from "./gender";

interface Staff {
  id: number;
  hashed_pw: string;
  created_at: string;
  modified_at: string;
  nickname: string;
  active: boolean;
  first_name: string;
  last_name: string;
  gender: Gender;
  tel: string;
  is_hr: boolean;
  is_team_head: boolean;
  title_id: number;
}

export default Staff;
