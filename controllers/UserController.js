const express = require("express");
const UserModel = require("../model/UserModel");
const CategoryModel = require("../model/CategoryModel");

exports.findAll = (req, res) => {

}

exports.pageCreate = (req, res) => {
    CategoryModel.findAll().then((categories) => {
        res.render('admin/users/create', {categories: categories});   
    })
}

exports.create = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.json({email, password});
}