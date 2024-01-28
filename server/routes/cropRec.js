const router = require("express").Router();
const CropModel = require("../models/CropModel");
const { UserModel } = require("../models/UserModel");


router.post("/location", async (req, res) => {

    try {

        const { selectedCity } = req.body; //ye nahi execute hoti

        const crops = await CropModel.findOne({ city: selectedCity });

        console.log(crops); //ye line chal rhi ha


        const { crop } = crops;

        console.log(crop);

        // recommend a suitable crop
        return res.status(200).send({ crop });



    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }


});

router.post("/parameter", async (req, res) => {
    console.log('llll')
    console.log(req.body);

    // try {
    //     const response = await axios.post('http://127.0.0.1:5000/parameter', {
    //         features: [req.body.nitrogen, req.body.phosphorus, req.body.potassium, req.body.temperature, req.body.humidity, req.body.ph, req.body.rainfall]
    //     });

        // res.json(response.data);
        res.status(200).send({ message: "Hiiiii" });
    // }  catch (error) {
    //     res.status(500).send({ message: "Internal Server Error" });
    // }


});

module.exports = router;