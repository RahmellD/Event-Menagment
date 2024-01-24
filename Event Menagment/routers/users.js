const router = require('express').Router();
const { createUser, updateUser, deleteUser, getUsers, getUserEvents } = require('../controllers/users');

router.post('/create', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

module.exports = router