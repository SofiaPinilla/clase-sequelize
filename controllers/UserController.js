const { User, Post } = require('../models/index.js');

const UserController = {
    create(req, res) {
        req.body.rol = "user";
        User.create({...req.body })
            .then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
            .catch(console.error)
    },
    getAll(req,res){
        User.findAll({
            include:[Post]
        })
        .then(users=> res.status(200).send({description:"Todos los usuarios",users}))
        .catch(err => {
            console.error(err)
            res.status(500).send({ message :'No se han podido cargas los usuarios'})
        })
    },
    async delete(req, res) {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            await Post.destroy({
                where: {
                    UserId: req.params.id
                }
            })
            res.send(
                'El usuario ha sido eliminado con éxito'
            )
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"ha habido un problema al eliminar el usuario"})
        }
    },
    async update(req, res) {
        try { 
            await User.update({...req.body},
            {
                where: {
                    id: req.params.id
                }
            })
                res.send('Usuario actualizado con éxito');
        } catch (error) {
            console.error(error)
            res.status(500).send({message:"no ha sido posible actualizado el usuario"})
        }
       }

}

module.exports = UserController
