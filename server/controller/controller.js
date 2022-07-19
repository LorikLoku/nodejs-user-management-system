//mundeson CRUD operacionet

var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request - gjat krijimit te userit te dhenat nuk munde te jene te zbrazta 
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,       //merr name prej body t request object dhe e vendos te name ndb
        email : req.body.email,     //merr email prej body t request object dhe e vendos te email ndb
        gender: req.body.gender,    //merr gender prej body t request object dhe e vendos te gender ndb
        status : req.body.status    //merr status prej body t request object dhe e vendos te status ndb
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user'); //pasi te dhenat nga forma shkojne ne db ne perseri behemi redirect ne te njejten faqe 
        })
        .catch(err =>{          //nese ka problem shfaq errorin
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){           //nese request query ka id
        const id = req.query.id;

        Userdb.findById(id)     //kerkon userin specifik ne db ne baze te id qe e merr prej request query
            .then(data =>{
                if(!data){      //nese te dhenat e userit mungojne shfaq errorin
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{      //nese ka problem shfaq errorin
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()           //kerkon dhe kthen te gjithe userat qe gjen ne db 
            .then(user => {
                res.send(user)
            })
            .catch(err => {     //nese ka problem shfaq errorin
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    // validate request - infot nuk munden me qene te zbrazta gjat updateimit
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})  //e gjen userin nbaz te id dhe i updateon infot e edituara
        .then(data => {
            if(!data){          //nese tentojm me updateu userin pa te dhena shfaq errorin
                res.status(404).send({ message : `Cannot Update user with ${id}.`})
            }else{              //dergo te dhenat
                res.send(data)
            }
        })
        .catch(err =>{          //nese ka problem shfaq errorin
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id) //e gjen userin nbaz te id dhe i fshin infot e tij
        .then(data => {
            if(!data){           //nese tentojm me fshij userin pa te dhena shfaq errorin
                res.status(404).send({ message : `Cannot Delete user with id ${id}. Maybe id is wrong`})
            }else{
                res.send({       //dergo mesazhin qe useri i fshi me sukses
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{           //nese ka problem shfaq errorin
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}