"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    const txn = await knex.transaction();
    try {
        // Deletes ALL existing entries
        await txn("team-members").del();
        await txn("dept-members").del();
        await txn("team-ancmts").del();
        await txn("dept-ancmts").del();
        await txn("public-ancmts").del();
        await txn("staffs").del();
        await txn("personal-infos").del();
        await txn("profiles").del();
        await txn("titles").del();
        await txn("teams").del();
        await txn("depts").del();
        // Inserts seed entries
        await txn("depts").insert([
            { dept: "IT" },
            { dept: "Human Resources" },
            { dept: "Production" },
        ]);
        await txn("teams").insert([
            { team: "Team Ho Wan" },
            { team: "Team Mut Fee" },
        ]);
        await txn("titles").insert([
            { title: "Chief Executive Officer" },
            { title: "Technical Director" },
            { title: "Junior Developer" },
            { title: "Human Resources Manager" },
        ]);
        await txn("profiles").insert([
            {
                nickname: "Andrew",
                first_name: "Big Boss",
                last_name: "Shek",
                gender: "M",
                tel: "23800000",
                picture: "5e843ef35ad6e.jpg",
                title_id: 1,
            },
            {
                nickname: "Leo",
                first_name: "Smart Intelligent Knowledgeable",
                last_name: "Lui",
                gender: "M",
                tel: "23800000",
                picture: "60e509d77b8cd.jpg",
                title_id: 2,
            },
            {
                nickname: "Cedric",
                first_name: "Mo Look",
                last_name: "Chat",
                gender: "F",
                tel: "23800000",
                picture: "1000_F_362426568_9Zmxa9SgYiUcGdIrg9LLxtBfgoJ9IebH.jpg",
                title_id: 3,
            },
        ]);
        await txn("personal-infos").insert([
            {
                hkid: "A123456(7)",
                date_of_birth: "2023-03-02",
                address: "Candy Int. Ltd., 20B, TML Tower, 3 Hoi Shing Rd, Tsuen Wan",
                bank_account: "000000000000000",
                monthly_salary: 109700,
            },
            {
                hkid: "A765432(1)",
                date_of_birth: "2023-03-02",
                address: "Candy Int. Ltd., 20B, TML Tower, 3 Hoi Shing Rd, Tsuen Wan",
                bank_account: "000000000000001",
                monthly_salary: 109700,
            },
            {
                hkid: "A777777(7)",
                date_of_birth: "2023-03-02",
                address: "Candy Int. Ltd., 20B, TML Tower, 3 Hoi Shing Rd, Tsuen Wan",
                bank_account: "000000000000001",
                monthly_salary: 109700,
            },
        ]);
        await txn("staffs").insert([
            {
                username: "andrewbbshek@candy.io",
                hashed_pw: "$2a$10$QgdC9TsJIprhq8603/INKOYVeTgAC5UcBj9jPP2997TFs5WNHJNVq",
                is_admin: true,
                profile_id: 1,
                personal_info_id: 1,
            },
            {
                username: "leosiklui@candy.io",
                hashed_pw: "$2a$10$QgdC9TsJIprhq8603/INKOYVeTgAC5UcBj9jPP2997TFs5WNHJNVq",
                is_admin: true,
                profile_id: 2,
                personal_info_id: 2,
            },
            {
                username: "cedricmlchat@candy.io",
                hashed_pw: "$2a$10$QgdC9TsJIprhq8603/INKOYVeTgAC5UcBj9jPP2997TFs5WNHJNVq",
                is_admin: true,
                profile_id: 3,
                personal_info_id: 3,
            },
        ]);
        await txn("public-ancmts").insert([
            {
                content: "Welcome to Candy Int. Ltd.!",
                staff_id: 1,
            },
        ]);
        await txn("dept-ancmts").insert([
            { dept_id: 1, content: "Announce to IT department!", staff_id: 1 },
        ]);
        await txn("team-ancmts").insert([
            { team_id: 1, content: "Announce to Team Ho Wan!", staff_id: 1 },
        ]);
        await txn("dept-members").insert([
            { staff_id: 1, dept_id: 1, is_dept_head: true },
            { staff_id: 2, dept_id: 2, is_dept_head: true },
            { staff_id: 3, dept_id: 1, is_dept_head: false },
        ]);
        await txn("team-members").insert([
            { staff_id: 1, team_id: 1, is_team_head: true },
            { staff_id: 2, team_id: 2, is_team_head: true },
            { staff_id: 3, team_id: 1, is_team_head: false },
        ]);
        await txn.commit();
    }
    catch (error) {
        console.log(`=====Unsuccessful transaction! Rollback!=====`);
        console.error(error);
        await txn.rollback();
    }
}
exports.seed = seed;
