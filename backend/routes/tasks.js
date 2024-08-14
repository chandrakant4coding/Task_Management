const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.route('/').get(taskController.getAllTasks);
router.route('/add').post(taskController.addTask);
router.route('/:id').put(taskController.updateTask);
router.route('/:id').delete(taskController.deleteTask);
router.route('/status').get(taskController.getTasksByStatus); 

module.exports = router;
