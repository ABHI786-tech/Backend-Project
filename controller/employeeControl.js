const mongoose = require("mongoose")
const employeeSchema = require("../models/employeesModel")

/// getting all employees data 
async function getEmployee(req, res) {
    try {
        const employees = await employeeSchema.find().lean()
        return res.status(200).send({ employees, message: "get employee data sucessfuly" })
    }
    catch (err) {
        res.status(404).send({ error: err, message: "Failed to fetch employee data" })
    }
}


///  creating an employee data
async function createEmployee(req, res) {
    try {
        let { name, age, gender } = req.body;
        const employees = await employeeSchema.create({ name, age, gender })
        return res.status(200).send({ employees, message: "Employee created successfully" })
    }
    catch (err) {
        res.status(404).send({ error: err, message: "Failed to create employee" })

    }
}

/// delete an employee data 
async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const employees = await employeeSchema.findByIdAndDelete(id)
        return res.status(200).send({ employees, message: "Employee deleted successfully" })
    }
    catch (err) {
        res.status(404).send({ error: err, message: "Failed to delete employee" })
    }
}

//// update an employee data
async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const employees = await employeeSchema.findByIdAndUpdate(id, req.body)
        return res.status(200).send({ employees, message: " employee updated sucessfuly" })
    }
    catch (err) {
        res.status(404).send({ error: err, message: "Failed to update employee" })
    }
}








module.exports = {
    getEmployee, createEmployee, deleteEmployee, updateEmployee
}