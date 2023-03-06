type Staff = {
	id: number;
	username: string;
	hashed_pw: string;
	active: boolean;
	created_at: string;
	updated_at: string;
	is_admin: boolean;
	profile_id: number;
	personal_info_id: number;
};

export default Staff;
