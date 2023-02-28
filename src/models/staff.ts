export interface StaffProfile {
	nickname: string;
	first_name: string;
	last_name: string;
	gender: "M" | "F" | "Other";
	tel: string;
	is_hr: boolean;
	is_team_head: boolean;
	title_id: number;
}

interface Staff extends StaffProfile {
	id: number;
	local: string;
	hashed_pw: string;
	created_at: string;
	modified_at: string;
	active: boolean;
}

export default Staff;
