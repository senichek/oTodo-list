const Position = require("../models/Position");

const positionController = {
  get: async (req, res) => {
    try {
      const dbResponse = await Position.findAll({
        where: {
          owner: req.session.user.id,
        },
      });

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

  create: async (req, res) => {
    try {
      const dbResponse = await Position.findAll({
        where: {
          owner: req.session.user.id,
        },
      });

      if (dbResponse.length > 0) {
        // Update
        const updated = await Position.update({ positions: req.body.positions }, {
            where: {
                // The logged-in user
              owner: req.session.user.id
            }
          });
          res.status(204).send(updated);
      } else {
        // Create
        const created = await Position.create({ owner: req.session.user.id, positions: req.body.positions });
        console.log(created);
        res.status(201).send(created);
      }
    } catch (error) {
        console.log(error);
    }
  },
};

module.exports = positionController;
