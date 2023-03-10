type Team = {
	id: number;
	team: string;
};

export type TeamMember = {
	id: number;
	staff_id: number;
	team_id: number;
	is_team_head: boolean;
};

export default Team;
