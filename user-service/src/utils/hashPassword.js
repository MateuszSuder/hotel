import bcrypt from "bcrypt";

/**
 * Hashes provided password
 * @param {string} password
 */
export default async function hashPassword(password) {
    return await bcrypt.hash(`${password}.${process.env.PEPPER}`, 10);
}