import encrypt from 'mongoose-encryption';

const encKey = process.env.ENC_KEY;
const sigKey = process.env.SIG_KEY;

/**
 * @param {mongoose.Schema} schema
 * @param {string[]} [exclude]
 * @return mongoose.Schema
 */
export default function encryptSchema(schema, exclude) {
    schema.plugin(encrypt, {
        encryptionKey: encKey,
        signingKey: sigKey,
        excludeFromEncryption: exclude
    });

    return schema;
}