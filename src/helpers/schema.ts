const schema = {
  login: {
    username: {
      isEmail: {
        errorMessage: "Invalid Email",
      },
      normalizeEmail: {},
    },
    password: {
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 0,
        },
        errorMessage: "Length > 8, 1 Lower Case and 1 Upper Case, No Symbol",
      },
      isAlphanumeric: {
        errorMessage: "Password must contains A-Z a-z 0-9",
      },
    },
  },
  register: {
    username: {
      isAlphanumeric: {
        errorMessage: "User Name contains A-Z a-z 0-9",
      },
      isLength: {
        options: {
          min: 6,
          max: 16,
        },
        errorMessage: "User Name Length between 6 and 16",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Invalid Email",
      },
      normalizeEmail: {},
    },
    tel: {
      optional: {},
      isMobilePhone: {
        options: "zh-HK" as "zh-HK",
      },
      errorMessage: "Invalid Mobile",
    },
    sex: {
      isIn: {
        options: ["M", "F"],
      },
      errorMessage: "The gander must be enter M or F.",
    },
    receiveNewsletter: {
      toBoolean: {},
    },
    password: {
      trim: {},
      escape: {},
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 0,
        },
        errorMessage: "Length > 8, 1 Lower Case and 1 Upper Case, No Symbol",
      },
      isAlphanumeric: {
        errorMessage: "Password must contains A-Z a-z 0-9",
      },
    },
    confirmPassword: {
      custom: {
        options: (confirmPassword: any, data: any) => {
          if (confirmPassword !== data.req.body.password) {
            /*Custom Validator Level*/
            throw new Error("Both Password doesn't match!");
          }
          return true;
        },
      },
    },
  },
};

export default schema;
