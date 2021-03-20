module.exports = (req, res) => {
    res.statusCode = 404;
    res.json({message: 'Page not found'});
}