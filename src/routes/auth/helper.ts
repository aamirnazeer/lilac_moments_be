import bcrypt from "bcrypt";

export const createHashedPassword = (password: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const checkHashedPassword = (password: string, hash: string) => {
    bcrypt.compareSync(password, hash);
};
