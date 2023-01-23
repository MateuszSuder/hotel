export default (req, res) => {
    console.log(req.session);
    res.send("hello");
}