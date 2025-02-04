import bcrypt from'bcrypt';


export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds);
        return hashPass;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}


