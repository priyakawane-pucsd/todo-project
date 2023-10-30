const { v4: uuid4 } = require('uuid');

module.exports = () => {
    return uuid4();
}