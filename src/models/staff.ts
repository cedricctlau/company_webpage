type Staff = {
  id: number;
  username: string;
  hashed_pw: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  priv_all: boolean;
  priv_private: boolean;
  profile_id: number;
  personal_info_id: number;
};

export default Staff;
