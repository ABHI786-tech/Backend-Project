const express = require("express");
const employeeController = require("../controller/employeeControl")
const router = express.Router();

router.get("/employee", employeeController.getEmployee )
router.post("/employee", employeeController.createEmployee)
router.delete("/employee/:id", employeeController.deleteEmployee)
router.put("/employee/:id", employeeController.updateEmployee)




module.exports = router;