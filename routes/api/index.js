const router = require("express").Router();
const userRoutes = require("./user");
//const studentRoutes = require('./studentRoutes');

router.use("/userRoutes", userRoutes);
//router.use('/students', studentRoutes);

module.exports = router;
