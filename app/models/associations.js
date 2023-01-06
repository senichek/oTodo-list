const User = require("./User");
const Task = require("./Task");
const Tag = require("./Tag");

User.hasMany(Task, {
  foreignKey: "owner",
});
Task.belongsTo(User, {
    foreignKey: "owner"
});

Tag.belongsToMany(Task, { through: 'task_has_tag_todo', foreignKey: "tag_id" });
Task.belongsToMany(Tag, { through: 'task_has_tag_todo', foreignKey: "task_id" });

module.exports = { User, Task, Tag };
