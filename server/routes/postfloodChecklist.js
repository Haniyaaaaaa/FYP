const router = require("express").Router();
const ChecklistModel = require("../models/PostFloodChecklistModel");

router.post('/addTaskk', async (req, res) => {
    try {
        const {
            task,
            userId
        } = req.body;

        // Find or create checklist for the user
        let checklist = await ChecklistModel.findOne({
            userId
        });

        if (!checklist) {
            // Create new checklist if it doesn't exist
            checklist = new ChecklistModel({
                userId: userId,
                items: []
            });
        }

        // Add new task to checklist
        checklist.items.push({
            task
        });

        // Save checklist to the database
        await checklist.save();

        res.status(200).json({
            message: 'Task added successfully'
        });
        console.log('task saved: ' + checklist)

    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

router.get('/getChecklistt/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve checklist tasks based on userID
        const checklistTasks = await ChecklistModel.findOne({
            userId
        });
        console.log(checklistTasks)

        if (!checklistTasks) {
            return res.status(404).json({
                message: "Checklist not found"
            });
        }

        // Extract task names and IDs
        const tasks = checklistTasks.items.map(item => ({
            id: item._id, // Include task ID
            task: item.task,
            status: item.completed
        }));
        res.status(200).json(tasks);

    } catch (error) {
        console.error('Error fetching checklist tasks:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});



router.put("/updateTaskk/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedTaskData = req.body;
        const updatedTask = await ChecklistModel.findOneAndUpdate({
            "items._id": taskId
        }, {
            $set: {
                "items.$.task": updatedTaskData.task
            }
        }, {
            new: true
        });

        if (!updatedTask) {
            res.status(404).json({
                message: 'Task not found'
            });
        } else {
            res.status(200).json({
                message: 'Task updated successfully',
                updatedTask
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error updating task'
        });
    }
});

// New endpoint to update task status
router.put("/updateStatuss", async (req, res) => {
    try {
        const {
            taskIds,
            status,
            userId
        } = req.body;

        // Update the status of tasks
        await ChecklistModel.updateMany({
            userId,
            "items._id": {
                $in: taskIds
            }
        }, {
            $set: {
                "items.$.completed": status
            }
        });

        res.status(200).json({
            message: 'Task status updated successfully'
        });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

router.delete('/deleteTaskk/:taskId', async (req, res) => {
    try {
        const userId = req.body.userId; // Get userId from request body
        const taskId = req.params.taskId;

        // Remove the task
        await ChecklistModel.findOneAndUpdate({
            userId
        }, {
            $pull: {
                items: {
                    _id: taskId
                }
            }
        });

        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});



module.exports = router;