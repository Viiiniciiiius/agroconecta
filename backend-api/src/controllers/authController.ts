import { AuthAdminRequest } from "../routes/auth/auth.types";

const adminToken = process.env.ADMIN_TOKEN;
const adminName = process.env.MONGO_USER;
const adminPassword = process.env.MONGO_PWD;

export const AuthAdmin = async (authData: AuthAdminRequest): Promise<{ token: string }> => {

    if (!adminToken || !adminName || !adminPassword) {
        throw new Error('Admin credentials are not set in environment variables');
    }

    if (authData.name === adminName && authData.password === adminPassword) {
        return { token: adminToken };
    } else {
        throw new Error('Invalid credentials');
    }
};
