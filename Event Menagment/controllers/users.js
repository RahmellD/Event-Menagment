const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create user
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password,
                phone
            },
        });
        res.json(user)

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//update users
const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body
        const update = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                first_name,
                last_name,
                email,
                password,
                phone
            }
        })
        res.json(update)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//delte user by id
const deleteUser = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(200).send('User deleted Successfully!')
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}




module.exports = { createUser, updateUser, deleteUser, getUsers }