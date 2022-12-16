import encrypt from 'mongoose-encryption';

const encKey = "p7HYaoZZucDcpphz7GLp+6F/JxwbVqm+J6eeJqWsV+0=";
const sigKey = "8oR3fCZleSrb4LfRxXAcnVieWPSNZ1lIxA7V6zriSwLtlkIjfpAm3h+8NA/2Dz/qAh9RlmXngGhEbjzefTHQCQ=="

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