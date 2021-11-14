const mongoose = require('mongoose')

const Role = mongoose.model('roles',
    new mongoose.Schema({
        role: String
    })
)

module.exports = Role;