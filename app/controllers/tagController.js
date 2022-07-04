const { Tag, Task } = require("../models/associations");

const tagController = {
  getAll: async (req, res) => {
    try {
      const dbResponse = await Tag.findAll();

      const tags = [];

      if (dbResponse.length !== 0) {
        for (el of dbResponse) {
          tags.push(el.get());
        }
      }

      res.json(tags);

      console.log("DBresponse", dbResponse);
    } catch (error) {
      console.log(error);
    }
  },
  detachFromTask: async (req, res) => {
    const taskId = req.params.id;
    const tagName = req.params.name;
    try {
      const dbResponse = await Task.findAll({
        where: {
          id: taskId,
          owner: req.session.user.id,
        },
        include: Tag,
      });

      // Get the tags from the db response
      const tags = [];
      for (el of dbResponse[0].get().Tags) {
        tags.push(el.get());
      }

      const filtered = tags.filter((el) => {
        if (el.name !== tagName) {
            return el.id;
        }
    });

    // Collect the Ids of the filtered tags
    const filteredTagIds = filtered.map(el => el.id);
    // Update association (pass the collection of tagIds instead of tag objects
    // because Table "task_has_tag" stores Ids .i.e. fk)
      await dbResponse[0].setTags(filteredTagIds);
      console.log(dbResponse[0]);
      res.sendStatus(204);

      // Get the task of the logged in user with tags
      // Detach tag from the task
    } catch (error) {
      console.log(error);
    }
  },

  attachToTask: async (req, res) => {
    const taskId = req.params.id;
    const tagId = req.params.tagid;
    try {
      const dbResponse = await Task.findAll({
        where: {
          id: taskId,
          owner: req.session.user.id,
        },
        include: Tag,
      });

      // Get the tags from the db response
      const tags = [];
      for (el of dbResponse[0].get().Tags) {
        tags.push(el.get());
      }

      // Get Ids of the tags and add new TagId to the collection
      const tagIds = [];

      for (const el of tags) {
        tagIds.push(el.id);
      }

      tagIds.push(tagId)

    // Update association (pass the collection of tagIds instead of tag objects
    // because Table "task_has_tag" stores Ids .i.e. fk)
      await dbResponse[0].setTags(tagIds);
      console.log(dbResponse[0]);
      res.sendStatus(201);

      // Get the task of the logged in user with tags
      // Detach tag from the task
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = tagController;
