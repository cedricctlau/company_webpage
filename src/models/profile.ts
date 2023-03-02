type Profile = {
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

export default Profile