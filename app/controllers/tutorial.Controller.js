const db = require("../models");
const Tutorial = db.tutorials;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "content cannot be empty!",
    });
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });

  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occured while creating the tutorial",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? {
        title: {
          $regex: new RegExp(title),
          $options: "i",
        },
      }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send(
          error.message || "Some error occured while creating the tutorial"
        );
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Not found Tutorial with id ${id}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send(
          error.message || "Some error occured while creating the tutorial"
        );
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Tutorial with id ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
