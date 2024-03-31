const router = require("express").Router();
const ChecklistModel = require("../models/ChecklistModel");

router.post('/addTask', async (req, res) => {
    try {
        const { task, userId } = req.body;

        // Find or create checklist for the user
        let checklist = await ChecklistModel.findOne({ userId });

        if (!checklist) {
            // Create new checklist if it doesn't exist
            checklist = new ChecklistModel({ userId: userId, items: [] });
        }

        // Add new task to checklist
        checklist.items.push({ task });

        // Save checklist to the database
        await checklist.save();

        res.status(200).json({ message: 'Task added successfully' });
        console.log('task saved: ' + checklist)

    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getChecklist/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve checklist tasks based on userID
        const checklistTasks = await ChecklistModel.find({ userId });
        const allTasks = checklistTasks.map(task => task.items.map(item => item.task));
        const flattenedTasks = allTasks.flat();

        res.send(flattenedTasks);

    } catch (error) {
        console.error('Error fetching checklist tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;