let employeeDb = require('../db/employees');

const getEmployees = (callback) => {
  setTimeout(() => {
    callback(null, employeeDb);
  }, 500);
};

const getEmployee = (employeeId, callback) => {
  getEmployees((error, data) => {
    if (error) {
      return callback(error);
    }
    let result = data.find((item) => item.id === employeeId);
    callback(null, result);
  });
};

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
