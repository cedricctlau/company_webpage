export type Staff = {
  id: number;
  account_id: number;
  profile_id: number;
  personal_info_id: number;
};

export type Account = {
  id: number;
  username: string;
  hashed_pw: string;
  active: boolean;
};

export type Profile = {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  gender: "M" | "F" | "Others";
  tel: string;
  staff_id: number;
  title_id: number;
  team_id: number;
};

export type PersonalInfo = {
  id: number;
  hkid: string;
  address: string;
};
