const router = require("express").Router();
const userRoutes = require("./users");
//const studentRoutes = require('./studentRoutes');

router.use("/users", userRoutes);
//router.use('/students', studentRoutes);

module.exports = router;
