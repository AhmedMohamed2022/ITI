const Quiz = require('../Models/Quiz');

async function createQuiz(req, res) {
    const data = req.body;
    let created = await Quiz.create(data);

    console.log(created);
    res.send("ok");
}

async function deleteQuiz(req, res) {
    const { id } = req.params;
    let deleted = await Quiz.deleteOne({ _id: id });

    console.log(deleted);
    res.send("ok");
}
async function updateQuiz(req, res) {
    const { id } = req.query;
    const data = req.body;
    let updated = await Quiz.updateOne({ _id: id }, data);

    console.log(updated);
    res.send("ok");
}


module.exports = { createQuiz, deleteQuiz, updateQuiz };