type Dept = {
	id: number;
	dept: string;
};

export type DeptMember = {
	id: number;
	staff_id: number;
	dept_id: number;
	is_dept_head: boolean;
};
export default Dept;
