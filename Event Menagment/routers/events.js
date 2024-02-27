const router = require('express').Router();
const { createEvent, getUserEvents, deleteEvent, updateEvent, getEvents, getEventUser, addUsersToEvent } = require('../controllers/events');

router.get('/:id', getUserEvents)
router.post('/create', createEvent)
router.delete('/:id', deleteEvent)
router.put('/:id', updateEvent)
router.get('/', getEvents)
router.get('/:id/users', getEventUser)
router.put('/add/:id', addUsersToEvent)
module.exports = router