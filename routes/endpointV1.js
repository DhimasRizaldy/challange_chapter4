const express = require("express");
const router = express.Router();
// Import Users
const { createUsers, getAllUsers, getDetailUsers, deleteUsers, updateUsers } = require("../handler/v1/users");
// Import Accounts
const { createAccounts, getAllAccounts, getDetailAccounts, deleteAccounts, updateAccounts } = require("../handler/v1/accounts");

// router main url
router.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: " Welcome to learn Restful APIs - Challange Chapter 4",
        data: null,
    });
});

// router url users
router.post("/users", createUsers);
router.get("/users", getAllUsers);
router.get("/users/:id", getDetailUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

// router url users
router.post("/accounts", createAccounts);
router.get("/accounts", getAllAccounts);
router.get("/accounts/:id", getDetailAccounts);
router.put("/accounts/:id", updateAccounts);
router.delete("/accounts/:id", deleteUsers);

// exports router
module.exports = router;