let express = require('express')
module.exports = function(Student){
    let router = express.Router()
    router.get('/students', function(req, res, next){
        Student.findAll( {order: ['name']}).then(students => {
            return res.json(students)
        })
    })
    router.post('/students', function(req, res, next){
        Student.create(req.body).then((data) => {
            return res.status(201).send('ok'    )
        })
    })
    router.patch('/students/:id', function(req, res, next){
        Student.update(
            req.body, {where: {id: req.params.id}}
        ).then((rowsModified) => {
            return res.send('ok')    
        })
    }),
    router.delete('/students/:id', function(req, res, next){
        Student.destroy({where: {id: req.params.id}}).then(() => {
        return res.send('ok')    
        }).catch(err => next(err))
    })

    return router
}