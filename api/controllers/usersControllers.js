const users = require ("../models/user");
function getAllUsers (req, res, next){
    
    res.json(users);
}
function getUserById (req, res, next) {
    const userId = req.params.id;

    const user = users.find(user => user.id == userId);

    if (!user) {
        res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
}
function createUser (req, res, next)  {
    const { id, name, email } = req.body;

    const userAlreadyExists = users.find(user => user.email === email);

    if (userAlreadyExists) {
        res.status(409).json({ message: "user already exists" });
    }

    users.push({ id, name, email });

    res.status(201).json(user);
}
function updateUser (req, res, next) {
    const { name } = req.body;
    const userId = req.params.id

    const user = users.find(user => user.id == userId)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    user.name = name;
    res.json(user);
}
function deleteUser (req, res, next){
    // Obter o id dos parametros
    const userId = req.params.id;
    // Verificar se o usuario com aquele id existe
    const userIdInDB = users.findIndex(user = user.id == userId);

    if (userIdInDB < 0) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remover o usuario do bd ()
    users.splice(userIdInDB, 1);

    res.status(204).end();
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}