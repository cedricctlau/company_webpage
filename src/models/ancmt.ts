export type PublicAncmt = {
	id: number;
} & Ancmt;

export type DeptAncmt = {
	id: number;
	dept_id: number;
} & Ancmt;

export type TeamAncmt = {
	id: number;
	team_id: number;
} & Ancmt;

type Ancmt = {
	content: string;
	created_at: string;
	updated_at: string;
	staff_id: number;
};
