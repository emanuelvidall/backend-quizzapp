const ValidationError = require('sequelize').ValidationError;

const errorHandler = (error, res)=>{

    const handler = error.constructor;
    const isEqual = handler === ValidationError;

    res.status(500).json({ message: 'teste' });
}

module.exports = errorHandler;
