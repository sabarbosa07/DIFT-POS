import * as bcrypt from 'bcryptjs';
const saltOrRounds = 10;

/**
 * 
 * @param passwordPlain 
 * @returns string text encrypt
 */
async function generateHash(passwordPlain:string): Promise<string> {
    const hash = await bcrypt.hash(passwordPlain, saltOrRounds);
    return hash;
}

/**
 * 
 * @param plain 
 * @param hash 
 * @returns 
 */
async function compareHash(plain:string, hash: string): Promise<any> {
    return await bcrypt.compare(plain, hash);
}

export {generateHash, compareHash}