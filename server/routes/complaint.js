const router = require("express").Router();
const ComplaintModel = require("../models/ComplaintModel");
const { UserModel } = require("../models/UserModel");

router.post("/save", async (req, res) => {
    try {
        const { complaint, userId } = req.body;

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newcomplaint = new ComplaintModel({ userId, complaint }).save();
        res.status(201).json({ message: 'complaint saved successfully' });

    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }

});

router.get("/get-complaint/:userId", async (req, res) => {
    try {

        const { userId } = req.params;

        const userComplaint = await ComplaintModel.find({ userId });

        if (!userComplaint) {
            return res.status(404).json({ message: 'Complaint not found for the provided userId' });
        }

        const simplifiedComplaints = userComplaint.map(({ complaint, response }) => ({ complaint, response }));

        res.json(simplifiedComplaints);

    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//on admin panel
router.get("/fetchUser-complaints", async (req, res) => {
    const complaints = await ComplaintModel.find({ responded: false })
        .populate({
            path: 'userId',
            model: UserModel,
            select: 'firstName lastName', // Select the fields you need
        })
        .select('_id complaint date');

    const filteredComplaints = await Promise.all(complaints.map(async (complaint) => {
        if (complaint.userId && complaint.userId.firstName && complaint.userId.lastName) {
            return {
                _id: complaint._id,
                firstName: complaint.userId.firstName,
                lastName: complaint.userId.lastName,
                complaint: complaint.complaint,
                date: complaint.date.toISOString().slice(0, 10),
            };
        } else {
            // Delete the complaint if userId does not exist or is missing firstName/lastName
            await ComplaintModel.findByIdAndDelete(complaint._id);
            return null; // Return null for removed complaint
        }
    }));

    // Filter out null values (removed complaints) and send the updated list
    const flattenedComplaints = filteredComplaints.filter(complaint => complaint !== null);
    res.json(flattenedComplaints);

});

router.post('/save-response/:complaintId', async (req, res) => {
    const { complaintId } = req.params;
    const { adminResponse } = req.body;

    try {
        // Find the complaint by ID
        const complaint = await ComplaintModel.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Update the responded field to true and save the response
        complaint.responded = true;
        complaint.response = adminResponse;

        // Save the updated complaint
        await complaint.save();

        res.json({ message: 'Response sent successfully' });
    } catch (error) {
        console.error('Error marking complaint as responded:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;

