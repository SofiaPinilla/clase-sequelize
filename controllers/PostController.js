const { Post, User, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const PostController = {
  create(req, res) {
    Post.create({ ...req.body, UserId: req.user.id })
      .then((post) =>
        res.status(201).send({ message: "Publicación creada con éxito", post })
      )
      .catch(console.error);
  },
  getAll(req, res) {
    Post.findAll({
      include: [User],
    })
      .then((posts) => res.send(posts))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({
            message: "Ha habido un problema al cargar las publicaciones",
          });
      });
  },
  getById(req, res) {
    Post.findByPk(req.params.id, {
      include: [User],
    })
      .then((post) => res.send(post))
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "No se ha podido cargar el post" });
      });
  },
  getOneByName(req, res) {
    Post.findAll({
      where: {
        title: {
          [Op.like]: `%${req.params.title}%`,
        },
      },
      include: [User],
    })
      .then((pepito) => res.send(pepito))
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "No se ha podido cargar el post" });
      });
  },
  async delete(req, res) {
    try {
      await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({
        message: "La publicación ha sido eliminada con éxito",
        id: req.params.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "No se ha podido destruir el post" });
    }
  },
};

module.exports = PostController;
