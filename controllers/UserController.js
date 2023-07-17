const express = require("express");
const UserModel = require("../model/UserModel");
const CategoryModel = require("../model/CategoryModel");
const bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
    UserModel.findAll()
        .then((users) => {
            CategoryModel.findAll()
                .then((categories) => {
                    res.render('admin/users/users', { users: users, categories: categories });
                }).catch((error) => {
                    res.redirect('/');
                });
        })
        .catch((error) => {
            res.redirect('/');
        })
}

exports.pageCreate = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/users/create', { categories: categories });
    })
}

exports.create = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({ where: { email: email } }).then((verificationEmail) => {
        if (verificationEmail == undefined) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            UserModel.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((error) => {
                res.redirect('/');
            })
        } else {
            res.redirect("/admin/users/create");
        }
    })
}

exports.edit = (req, res) => {
    const id = req.params.id;

    UserModel.findByPk(id)
        .then((user) => {
            CategoryModel.findAll()
                .then((categories) => {
                    res.render('admin/users/update', { user: user, categories: categories });
                })
                .catch((error => {
                    res.redirect("/");
                }));
        })
        .catch((error) => {
            res.redirect('/');
        });
};

exports.update = (req, res) => {
    const id = req.body.id;
    const email = req.body.email;

    UserModel.update(
        {email: email}, {where: {id: id}}
    )
    .then(() => {
        res.redirect("/admin/users");
    })
};

exports.delete = (req, res) => {
    const id = req.body.id;

    UserModel.destroy({
        where: {id: id}
    })
    .then(() => {
        res.redirect('/admin/users');
    })
}