interface Announcement {
	id: number;
	content: string;
	is_public: boolean;
	created_at: string;
	modified_at:string;
	staff_id: number;
}

export default Announcement;
