const generateId = require('../utils/constants');
const todoValidations = require('../validation/todo.validations');
const { statusCodes, responseMessages } = require('../utils/responses');

const tasks = [];

/**
 * API TO CREATE TODO TASK IN ARRAY
 * @body {task_name, status} req 
 * @param {id, task_name, status, created_at, updated_at} res
 * @returns 
 */
exports.createTask = (req, res) => {
    const { error } = todoValidations.createTask.validate(req.body);
    if (error) {
        return res.status(statusCodes.BAD_REQUEST).
            json({
                message: responseMessages.BAD_REQUEST,
                error: error.details[0].message,
                status_code: statusCodes.BAD_REQUEST,
                is_success: false
            })
    }
    if (!req.body.status) {
        req.body.status = 'todo';
    }
    req.body.created_at = new Date();
    req.body.updated_at = new Date();

    const newTask = {
        id: generateId(),
        ...req.body,
    };
    tasks.push(newTask);
    res.status(statusCodes.CREATED).
        json({
            message: responseMessages.CREATED,
            newTask,
            status_code: statusCodes.CREATED,
            is_success: true
        });
};

/**
 * API TO GET ALL TODO TASKS
 * @param {id, task_name, status, created_at, updated_at} res 
 * @returns 
 */
exports.getTasks = (req, res) => {
    res.status(statusCodes.CREATED).
        json({
            message: responseMessages.OK,
            tasks,
            status_code: statusCodes.OK,
            is_success: true
        });
};

/**
 * API TO GET TASK BY ID
 * @param {id} req 
 * @param {id, task_name, status, created_at, updated_at} res 
 * @returns 
 */
exports.getTasksById = (req, res) => {
    const taskId = req.params.id;
    const { error } = todoValidations.getTaskById.validate({ id: taskId });
    if (error) {
        return res.status(statusCodes.BAD_REQUEST).
            json({
                message: responseMessages.BAD_REQUEST,
                error: error.details[0].message,
                status_code: statusCodes.BAD_REQUEST,
                is_success: false
            })
    }
    //check id extist or not in array
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        res.status(statusCodes.OK).
            json({
                message: responseMessages.OK,
                task,
                status_code: statusCodes.OK,
                is_success: true
            });
    } else {
        res.status(statusCodes.NOT_FOUND).
            json({
                message: responseMessages.NOT_FOUND,
                task: {},
                status_code: statusCodes.NOT_FOUND,
                is_success: false
            });
    }
};

/**
 * API TO UPDATE TASK BY ID
 * @param {id,task_name, status } req 
 * @param {id, task_name, status, created_at, updated_at} res
 * @returns 
 */
exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { error } = todoValidations.updateTask.validate({ id: taskId, ...req.body });
    if (error) {
        return res.status(statusCodes.BAD_REQUEST).
            json({
                message: responseMessages.BAD_REQUEST,
                error: error.details[0].message,
                status_code: statusCodes.BAD_REQUEST,
                is_success: false
            })
    }
    //find index
    const index = tasks.findIndex((task) => task.id === taskId);
    let task = tasks[index];
    task.task_name = req.body.task_name ? req.body.task_name : task.task_name;
    task.status = req.body.status ? req.body.status : task.status;
    task.updated_at = req.body.updated_at ? req.body.updated_at : task.updated_at;
    if (index !== -1) {
        tasks[index] = task;
        res.status(statusCodes.OK).
            json({
                message: responseMessages.OK,
                task: tasks[index],
                status_code: statusCodes.OK,
                is_success: true
            });
    } else {
        res.status(statusCodes.NOT_FOUND).
            json({
                message: responseMessages.NOT_FOUND,
                task: {},
                status_code: statusCodes.NOT_FOUND,
                is_success: false
            });
    }
};

/**
 * API TO DELETE TASK BY ID
 * @param {id} req 
 * @returns 
 */
exports.deleteTak = (req, res) => {
    const taskId = req.params.id;
    const { error } = todoValidations.deleteTask.validate({ id: taskId });
    if (error) {
        return res.status(statusCodes.BAD_REQUEST).
            json({
                message: responseMessages.BAD_REQUEST,
                error: error.details[0].message,
                status_code: statusCodes.BAD_REQUEST,
                is_success: false
            })
    }
    //find index
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        return res.status(statusCodes.DELETED).
            json({
                message: responseMessages.DELETED,
                task: {},
                status_code: statusCodes.DELETED,
                is_success: true
            });
    } else {
        res.status(statusCodes.NOT_FOUND).
            json({
                message: responseMessages.NOT_FOUND,
                task: {},
                status_code: statusCodes.NOT_FOUND,
                is_success: false
            });
    }
};