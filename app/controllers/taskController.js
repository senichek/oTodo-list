const { Task, Tag } = require("../models/associations");
const Position = require("../models/Position");

const taskController = {
  getAllByUserId: async (req, res) => {
    // The logged in user
    const user = req.session.user;
    try {
      const dbResponse = await Task.findAll({
        where: {
          owner: user.id,
        },
        include: Tag
      });

      const tasks = [];

      if (dbResponse.length !== 0) {
        for (el of dbResponse) {
          tasks.push(el.get());
        }
      }

      // If the order (positions) exist sort the tasks
      // according to the order (to maintain the drag-and-drop positions
      // after the page reload).
      const posisionsDbResponse = await Position.findAll({where: {
        owner: req.session.user.id
      }})

      // Sort the tasks according to the positions
      const sortedTasks = [];
      if ((posisionsDbResponse).length > 0) {
        const positions = posisionsDbResponse[0].get().positions.split('|');
        // position name = task id.
        for (const position of positions) {
          for (const task of tasks) {
            if (position === task.id.toString()) {
              sortedTasks.push(task);
            }
          }
        }
      }
      console.log("Tasks from DB", dbResponse);
      if (sortedTasks.length > 0) {
        res.render("tasks", { title: "Tasks", tasks: sortedTasks });
      } else {
        res.render("tasks", { title: "Tasks", tasks });
      }
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    const { taskId, taskName } = req.body;
      try {
        const dbResponse = await Task.update({ name: taskName }, {
          where: {
            id: taskId,
            // Make sure we do not update the task of other user
            owner: req.session.user.id
          }
        });

        if (dbResponse.length > 0) {
          console.log("Updated", dbResponse);
          res.sendStatus(200);
        } else {
          console.log("Update didn't happen");
          return;
        }
      } catch (error) {
        console.log(error);
      }
  },

  delete: async (req, res) => {
    const taskId = req.params.id;
    try {
      const exists = await Task.findAll({where: {
         // We can only delete the task of the logged-in user.
        owner: req.session.user.id,
        id: taskId
      }});
      if (exists.length > 0) {
        const deleted = await Task.destroy({where: {
        owner: req.session.user.id,
        id: taskId
        }});
        console.log("Deleted task", deleted);
        // You must also delete the task's position from the 
        // "positions" table.
        const positionsDbResponse = await Position.findAll({where: {
          owner: req.session.user.id
        }});

        if (positionsDbResponse.length > 0) {
          const positions = positionsDbResponse[0].get().positions.split('|');
          const updatedPositions = positions.filter(p => p !== taskId);
          const updatedPositionsAsString = updatedPositions.join('|')
          const updated = await Position.update({ positions: updatedPositionsAsString }, {
            where: {
                // The logged-in user
              owner: req.session.user.id
            }
          });
        }
        res.sendStatus(204);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },

  create: async (req, res) => {
    const taskName = req.body.taskname;
    console.log(taskName);
    if (!taskName) {
      res.status(404).json({message: "invalid input"});
    } else {
      const created = await Task.create({ name: taskName, owner: req.session.user.id });
      // Update positions. The position of new task is equal its ID
      const posisionsDbResponse = await Position.findAll({where: {
        owner: req.session.user.id
      }})
      if ((posisionsDbResponse).length > 0) {
        const positions = posisionsDbResponse[0].get().positions.split('|');
        positions.push(created.get().id);
        const positionsAsString = positions.join('|');
        await Position.update({ positions: positionsAsString }, {
          where: {
              // The logged-in user
            owner: req.session.user.id
          }
        });
      }
      console.log("Created task", created);
      res.redirect("/tasks");
    }
  }
};

module.exports = taskController;
