const { Task, Tag } = require("../models/associations");

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

      res.render("tasks", { title: "Tasks", tasks });

      console.log("DBresponse", dbResponse);
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
        console.log("Deleted", deleted);
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
      console.log("Created task", created);
      res.redirect("/tasks");
    }
  }
};

module.exports = taskController;
