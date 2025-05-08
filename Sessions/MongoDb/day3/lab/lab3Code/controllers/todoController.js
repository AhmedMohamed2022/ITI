const Todo = require('../Models/Todo');

async function CreateTode(req, res) {
    const data = req.body;
    let created = await Todo.create(data);

    console.log(created);
    res.send(created);
}
async function GetTodos(req, res) {
    const data = req.body;
    const {id}=req.params;
    let Todos = await Todo.find({userId:id});

    console.log(Todos);
    res.send(Todos);
}
async function EditTode(req, res) {
    const data = req.body;
    const {todoId} = req.params;
    let updated = await Todo.findOneAndUpdate({_id:todoId},data);

    console.log(updated);
    res.send("updated");
}
async function DeleteTodo(req, res) {
    const data = req.body;
    let deleted = await Todo.deleteOne(data);

    console.log(deleted);
    res.send("deleted");
}





module.exports = { CreateTode, GetTodos, EditTode,DeleteTodo };