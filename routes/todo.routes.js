const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controllers');

//post method
router.post('/', (req, res) => {
    todoController.createTask(req, res);
});

//get method
router.get('/', (req, res) => {
    todoController.getTasks(req, res);
});

//get by id method
router.get('/:id', (req, res) => {
    todoController.getTasksById(req, res);
});

//put method
router.put('/:id', (req, res) => {
    todoController.updateTask(req, res);
});

//delete method
router.delete('/:id', (req, res) => {
    todoController.deleteTak(req, res);
});

module.exports = router;
