const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create event and asign participants
const createEvent = async (req, res) => {
    try {
        const { title, description, location, start_date, end_date,
            start_registration, end_registration, max_participants, image_url, userId } = req.body
        const event = await prisma.event.create({
            data: {
                title,
                description,
                location,
                start_date,
                end_date,
                start_registration,
                end_registration,
                image_url,
                max_participants,
                userId
            },
        });
        res.json(event)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
};

//get all events 
const getEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany()
        res.json(events)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }

}

//get all events for 1 user
const getUserEvents = async (req, res) => {
    try {
        const events = await prisma.user.findMany({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                Event: {
                    select: {
                        title: true,
                        description: true,
                        location: true,
                        start_date: true,
                        end_date: true
                    }
                }
            }
        })
        res.json(events)

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//delete event by id
const deleteEvent = async (req, res) => {
    try {
        const event = await prisma.event.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.status(200).send("Event deleted successfully!")
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
};

//update event
const updateEvent = async (req, res) => {
    try {
        const { title, description, location, start_date, end_date,
            start_registration, end_registration, max_participants, image_url } = req.body
        const event = await prisma.event.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title,
                description,
                location,
                start_date,
                end_date,
                start_registration,
                end_registration,
                max_participants,
                image_url
            }
        })

        res.json(event)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}

//get all Users for 1 event
const getEventUser = async (req, res) => {
    try {
        const users = await prisma.event.findMany({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        email: true
                    }
                }
            }
        })
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
}


module.exports = { createEvent, getUserEvents, deleteEvent, updateEvent, getEvents, getUserEvents, getEventUser }