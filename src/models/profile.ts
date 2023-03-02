type Profile = {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  gender: "M" | "F" | "Others";
  tel: string;
  title_id: number;
};

export default Profile;
