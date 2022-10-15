const { create } = require('./Users.model');
const User = require('./Users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter, welcome } = require('../Utils/mailer');