const mainController = {
  renderGreet: (req, res) => {
    const title = "ToDo App"
    res.render("greet", { title });
  }
};

module.exports = mainController;
