declare module 'company_dashboard/build' {
  export {};

}
declare module 'company_dashboard/jest.config' {
  const _exports: import('ts-jest').JestConfigWithTsJest;
  export = _exports;

}
declare module 'company_dashboard/knex.tools' {
  export {};

}
declare module 'company_dashboard/knexfile' {
  export {};

}
declare module 'company_dashboard/migrations/20230302051119_01-init' {
  import { Knex } from "knex";
  export function up(knex: Knex): Promise<void>;
  export function down(knex: Knex): Promise<void>;

}
declare module 'company_dashboard/protected/admin/portal' {
  export {};

}
declare module 'company_dashboard/protected/attendance' {
  export {};

}
declare module 'company_dashboard/protected/dashboard' {
  export {};

}
declare module 'company_dashboard/protected/directory' {
  export {};

}
declare module 'company_dashboard/protected/modules/dashboard/hideBtn' {
  export function hideBtn(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/dashboard/loadAncmts' {
  export function loadAncmts(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/dashboard/loadModals' {
  export function loadModals(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/directory/filter' {
  export function regTitleSelect(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/directory/loadProfile' {
  export function loadProfiles(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/directory/viewDetail' {
  export function viewDetailBtn(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/loadNavbar' {
  export function loadNavBar(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/portal/regLxnrs' {
  export function regLxnrs(): void;

}
declare module 'company_dashboard/protected/modules/profile/changePW' {

}
declare module 'company_dashboard/protected/modules/profile/loadConfProfile' {
  export function loadPage(): Promise<void>;

}
declare module 'company_dashboard/protected/modules/profile/membership' {
  export function loadMembership(): Promise<void>;

}
declare module 'company_dashboard/protected/profile' {
  export {};

}
declare module 'company_dashboard/public/index' {

}
declare module 'company_dashboard/seeds/01-init' {
  import { type Knex } from "knex";
  export function seed(knex: Knex): Promise<void>;

}
declare module 'company_dashboard/src/helpers/errorHandler' {
  import { Request, Response } from "express";
  export default function myErrorHandler(e: any, req: Request, res: Response): void;

}
declare module 'company_dashboard/src/helpers/formidable' {
  import { Request } from "express";
  export const form: import("formidable/Formidable");
  export function formidable_promise(req: Request): Promise<unknown>;
  type formResult = {
      fields?: any;
      files?: any;
  };
  export function transfer_formidable_into_obj(form_result: formResult): {};
  export {};

}
declare module 'company_dashboard/src/helpers/guard' {
  import { Request, Response, NextFunction } from "express";
  export const loginGuard: (req: Request, res: Response, next: NextFunction) => void;
  export const adminGuard: (req: Request, res: Response, next: NextFunction) => void;
  export const redirectMiddleware: (req: Request, res: Response, next: NextFunction) => void;

}
declare module 'company_dashboard/src/helpers/hash' {
  /**
   * @params plainPassword: supplied when signup
   */
  export function hashPassword(plainPassword: string): Promise<string>;
  /**
   * @params plainPassword: supplied when login
   * @params hashedPassword: looked up from database
   */
  export function checkPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;

}
declare module 'company_dashboard/src/helpers/knex' {
  const myKnex: import("knex").Knex<any, unknown[]>;
  export default myKnex;

}
declare module 'company_dashboard/src/helpers/logger' {
  import { Request, Response, NextFunction } from "express";
  export function logger(req: Request, res: Response, next: NextFunction): void;

}
declare module 'company_dashboard/src/helpers/schema' {
  const schema: {
      login: {
          username: {
              isEmail: {
                  errorMessage: string;
              };
              normalizeEmail: {};
          };
          password: {
              isStrongPassword: {
                  options: {
                      minLength: number;
                      minLowercase: number;
                      minUppercase: number;
                      minSymbols: number;
                  };
                  errorMessage: string;
              };
              isAlphanumeric: {
                  errorMessage: string;
              };
          };
      };
      register: {
          username: {
              isAlphanumeric: {
                  errorMessage: string;
              };
              isLength: {
                  options: {
                      min: number;
                      max: number;
                  };
                  errorMessage: string;
              };
          };
          email: {
              isEmail: {
                  errorMessage: string;
              };
              normalizeEmail: {};
          };
          tel: {
              optional: {};
              isMobilePhone: {
                  options: "zh-HK";
              };
              errorMessage: string;
          };
          sex: {
              isIn: {
                  options: string[];
              };
              errorMessage: string;
          };
          receiveNewsletter: {
              toBoolean: {};
          };
          password: {
              trim: {};
              escape: {};
              isStrongPassword: {
                  options: {
                      minLength: number;
                      minLowercase: number;
                      minUppercase: number;
                      minSymbols: number;
                  };
                  errorMessage: string;
              };
              isAlphanumeric: {
                  errorMessage: string;
              };
          };
          confirmPassword: {
              custom: {
                  options: (confirmPassword: any, data: any) => boolean;
              };
          };
      };
  };
  export default schema;

}
declare module 'company_dashboard/src/helpers/session' {
  /// <reference types="qs" />
  /// <reference types="express" />
  import Priv from "company_dashboard/src/models/priv";
  export const sessionMiddleware: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
  module "express-session" {
      interface SessionData {
          staff?: {
              id: number;
              priv: Priv;
          };
      }
  }

}
declare module 'company_dashboard/src/models/ancmt' {
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
  export {};

}
declare module 'company_dashboard/src/models/dept' {
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

}
declare module 'company_dashboard/src/models/personalInfo' {
  type PersonalInfo = {
      id: number;
      hkid: string;
      date_of_birth: string;
      address: string;
      bank_account: string;
      monthly_salary: number;
  };
  export default PersonalInfo;

}
declare module 'company_dashboard/src/models/priv' {
  type Priv = {
      isAdmin: boolean;
      isDeptHead: boolean;
      isTeamHead: boolean;
  };
  export default Priv;

}
declare module 'company_dashboard/src/models/profile' {
  type Profile = {
      id: number;
      nickname: string;
      first_name: string;
      last_name: string;
      gender: "M" | "F" | "Others";
      tel: string;
      picture: string;
      title_id: number;
  };
  export default Profile;

}
declare module 'company_dashboard/src/models/reply' {
  export interface ErrorLog extends Reply {
      error: {
          method: string;
          url: string;
          statusCode: number | undefined;
          message: string;
      };
  }
  interface Reply {
      success: boolean;
      message?: string;
      outcome?: any;
      error?: any;
  }
  export default Reply;

}
declare module 'company_dashboard/src/models/staff' {
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

}
declare module 'company_dashboard/src/models/team' {
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

}
declare module 'company_dashboard/src/models/title' {
  type Title = {
      id: number;
      title: string;
  };
  export default Title;

}
declare module 'company_dashboard/src/router' {
  export const adminRoute: import("express-serve-static-core").Router;
  export const deptAncmtRoute: import("express-serve-static-core").Router;
  export const profileRoute: import("express-serve-static-core").Router;
  export const publicAncmtRoute: import("express-serve-static-core").Router;
  export const teamAncmtRoute: import("express-serve-static-core").Router;
  export const userRoute: import("express-serve-static-core").Router;

}
declare module 'company_dashboard/src/routes/adminController' {
  import AdminService from "company_dashboard/src/routes/adminService";
  import { Request, Response } from "express";
  class AdminController {
      private s;
      private errorHandler;
      constructor(s: AdminService, errorHandler: (...others: any[]) => void);
      createTitle: (req: Request, res: Response) => Promise<void>;
      editTitle: (req: Request, res: Response) => Promise<void>;
      createDept: (req: Request, res: Response) => Promise<void>;
      editDept: (req: Request, res: Response) => Promise<void>;
      createTeam: (req: Request, res: Response) => Promise<void>;
      editTeam: (req: Request, res: Response) => Promise<void>;
      getProfileSudo: (req: Request, res: Response) => Promise<void>;
      genAcc: (req: Request, res: Response) => Promise<void>;
  }
  export default AdminController;

}
declare module 'company_dashboard/src/routes/adminService' {
  import { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  class AdminService {
      private knex;
      constructor(knex: Knex);
      createTitle: (title: string) => Promise<Reply>;
      editTitle: (id: number, title: string) => Promise<Reply>;
      createDept: (dept: string) => Promise<Reply>;
      editDept: (id: number, dept: string) => Promise<Reply>;
      createTeam: (team: string) => Promise<Reply>;
      editTeam: (id: number, team: string) => Promise<Reply>;
      getProfileSudo: (staff_id: number) => Promise<Reply>;
      genAcc: (nickname: string, first_name: string, last_name: string) => Promise<Reply>;
  }
  export default AdminService;

}
declare module 'company_dashboard/src/routes/deptAncmtController' {
  import { Request, Response } from "express";
  import "../helpers/session";
  import DeptAncmtService from "company_dashboard/src/routes/deptAncmtService";
  class DeptAncmtController {
      private s;
      private errorHandler;
      constructor(s: DeptAncmtService, errorHandler: (e: any, req: Request, res: Response) => void);
      getDeptList: (req: Request, res: Response) => Promise<void>;
      getDeptAncmts: (req: Request, res: Response) => Promise<void>;
      createDeptAncmt: (req: Request, res: Response) => Promise<void>;
      editDeptAncmt: (req: Request, res: Response) => Promise<void>;
      delDeptAncmt: (req: Request, res: Response) => Promise<void>;
  }
  export default DeptAncmtController;

}
declare module 'company_dashboard/src/routes/deptAncmtService' {
  import { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  class DeptAncmtService {
      private knex;
      constructor(knex: Knex);
      getDeptList: (staff_id: number) => Promise<Reply>;
      getDeptAncmts: (staff_id: number) => Promise<Reply>;
      createDeptAncmt: (staff_id: number, content: string, dept_id: number) => Promise<Reply>;
      editDeptAncmt: (id: number, content: string, staff_id: number) => Promise<Reply>;
      delDeptAncmt: (id: number, staff_id: number) => Promise<Reply>;
  }
  export default DeptAncmtService;

}
declare module 'company_dashboard/src/routes/profileController' {
  import { Request, Response } from "express";
  import "../helpers/session";
  import ProfileService from "company_dashboard/src/routes/profileService";
  export default class ProfileController {
      private s;
      private errorHandler;
      constructor(s: ProfileService, errorHandler: (error: any, req: Request, res: Response) => void);
      getAllProfiles: (req: Request, res: Response) => Promise<void>;
      getAllTitles: (req: Request, res: Response) => Promise<void>;
      getMembership: (req: Request, res: Response) => Promise<void>;
  }

}
declare module 'company_dashboard/src/routes/profileService' {
  import type { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  export default class ProfileService {
      private knex;
      constructor(knex: Knex);
      getAllProfiles: () => Promise<Reply>;
      getAllTitles: () => Promise<Reply>;
      getMembership: (id: number) => Promise<Reply>;
  }

}
declare module 'company_dashboard/src/routes/publicAncmtController' {
  import { Request, Response } from "express";
  import "../helpers/session";
  import PublicAncmtService from "company_dashboard/src/routes/publicAncmtService";
  class PublicAncmtController {
      private s;
      private errorHandler;
      constructor(s: PublicAncmtService, errorHandler: (e: any, req: Request, res: Response) => void);
      getPublicAncmts: (req: Request, res: Response) => Promise<void>;
      createPublicAncmt: (req: Request, res: Response) => Promise<void>;
      editPublicAncmt: (req: Request, res: Response) => Promise<void>;
      delPublicAncmt: (req: Request, res: Response) => Promise<void>;
  }
  export default PublicAncmtController;

}
declare module 'company_dashboard/src/routes/publicAncmtService' {
  import { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  class PublicAncmtService {
      private knex;
      constructor(knex: Knex);
      getPublicAncmts: (staff_id: number) => Promise<Reply>;
      createPublicAncmt: (staff_id: number, content: string) => Promise<Reply>;
      editPublicAncmt: (id: number, content: string, staff_id: number) => Promise<Reply>;
      delPublicAncmt: (id: number, staff_id: number) => Promise<Reply>;
  }
  export default PublicAncmtService;

}
declare module 'company_dashboard/src/routes/teamAncmtController' {
  import { Request, Response } from "express";
  import "../helpers/session";
  import TeamAncmtService from "company_dashboard/src/routes/teamAncmtService";
  class TeamAncmtController {
      private s;
      private errorHandler;
      constructor(s: TeamAncmtService, errorHandler: (e: any, req: Request, res: Response) => void);
      getTeamList: (req: Request, res: Response) => Promise<void>;
      getTeamAncmts: (req: Request, res: Response) => Promise<void>;
      createTeamAncmt: (req: Request, res: Response) => Promise<void>;
      editTeamAncmt: (req: Request, res: Response) => Promise<void>;
      delTeamAncmt: (req: Request, res: Response) => Promise<void>;
  }
  export default TeamAncmtController;

}
declare module 'company_dashboard/src/routes/teamAncmtService' {
  import { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  class TeamAncmtService {
      private knex;
      constructor(knex: Knex);
      getTeamList: (staff_id: number) => Promise<Reply>;
      getTeamAncmts: (staff_id: number) => Promise<Reply>;
      createTeamAncmt: (staff_id: number, content: string, team_id: number) => Promise<Reply>;
      editTeamAncmt: (id: number, content: string, staff_id: number) => Promise<Reply>;
      delTeamAncmt: (id: number, staff_id: number) => Promise<Reply>;
  }
  export default TeamAncmtService;

}
declare module 'company_dashboard/src/routes/userController' {
  import { Request, Response } from "express";
  import UserService from "company_dashboard/src/routes/userService";
  import "../helpers/session";
  export default class UserController {
      private s;
      private errorHandler;
      constructor(s: UserService, errorHandler: (error: any, req: Request, res: Response) => void);
      login: (req: Request, res: Response) => Promise<void>;
      logout: (req: Request, res: Response) => Promise<void>;
      changePW: (req: Request, res: Response) => Promise<void>;
      getSelfProfile: (req: Request, res: Response) => Promise<void>;
      getPriv: (req: Request, res: Response) => Promise<void>;
  }

}
declare module 'company_dashboard/src/routes/userService' {
  import type { Knex } from "knex";
  import Reply from "company_dashboard/src/models/reply";
  export default class UserService {
      private knex;
      private hashPassword;
      private checkPassword;
      constructor(knex: Knex, hashPassword: (a: string) => Promise<string>, checkPassword: (a: string, b: string) => Promise<boolean>);
      login: (username: string, password: string) => Promise<Reply>;
      changePW: (staff_id: number, old_pw: string, new_pw: string) => Promise<Reply>;
      getSelfProfile: (staff_id: number) => Promise<Reply>;
  }

}
declare module 'company_dashboard/src/server' {
  import "./helpers/session";

}
declare module 'company_dashboard/tests/helpers/hash.test' {
  export {};

}
declare module 'company_dashboard/try/try' {
  export function divide(a: number, b: number): {
      success: boolean;
      result: number;
      error?: undefined;
  } | {
      success: boolean;
      error: unknown;
      result?: undefined;
  };

}
declare module 'company_dashboard/try/try.test' {
  export {};

}
declare module 'company_dashboard' {
  import main = require('company_dashboard/src/server');
  export = main;
}