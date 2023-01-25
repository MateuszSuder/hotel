/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    res.clearCookie('token', { httpOnly: true }).status(200).send(null);
}