let express = require('express')
let Sequelize = require('sequelize')
module.exports = function(Student){
    let router = express.Router()
    router.get('/students', function(req, res, next){
        Student.findAll().then(students => {
            return res.json(students)
        })
    })
    router.post("/students", function(req,res,next){
        Student.create(req.body).then((data) => {
            return res.status(201).send('ok')
        }).catch(err => {
            if(err instanceof Sequelize.ValidationError){
                let messages = err.errors.map((e) => e.message)
                return res.status(500).json(messages)
            }
        })
    }),
    router.patch("/students/:id", function(req, res, next){
        Student.update(
            req.body, {where: {id: req.params.id}})
            .then((rowsModified) => {
                if(!rowsModified[0]){
                    return res.status(404).send('Not Found')
                }else{
                    return res.send('ok')
                }    
            }).catch(err => {
                if(err instanceof Sequelize.ValidationError){
                    let messages = err.errors.map((e) => e.meesage)
                    return res.status(500).json(messages)
                }
            })
    }),
    router.delete('/students/:id', function(req, res, next){
        Student.destroy({where: {id:req.params.id}})
        .then((rowsModified) => {
            return res.send('ok')
        }).catch(err => next(err))
    })
    return router
}