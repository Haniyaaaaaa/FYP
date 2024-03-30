const router = require("express").Router();
const NotesModel = require("../models/NotesModel");

router.post("/save", async (req, res) => {
    try {

        const { userId, notes } = req.body;

        //saving notes in db
        let createNotes = await new NotesModel({ userId: userId, content: notes }).save();

        res.status(200).send({ message: "Notes saved successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Errorrr" });
    }
});

router.get("/view/:userId", async (req, res) => {

    try {
        const { userId } = req.params;
        // Use userId to fetch notes from the database
        const fetchedNotes = await NotesModel.find({ userId });

        if (!fetchedNotes || fetchedNotes.length === 0) {
            return res.status(404).send({ message: "Notes not found for this user" });
        }

        // Extract content from all fetched documents
        const allNotes = fetchedNotes.map(note => note.content);

        return res.status(200).send({ allNotes });

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

module.exports = router;