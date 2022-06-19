
const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data)

        if(error){
            next(res.status(400).json(error));
        }
        next();
    }
}

module.exports = validatorHandler;