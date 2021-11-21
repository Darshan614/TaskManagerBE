const express = require('express');
const taskController = require('../controllers/tasks');
const router = express.Router();

router.get('/gettasks',taskController.gettasks);
router.post('/addtask',taskController.addtask);
router.post('/deletetask',taskController.deletetask);
router.post('/edittask',taskController.edittask);

module.exports = router;