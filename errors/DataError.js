// eslint-disable-next-line max-classes-per-file
class DataError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class PropertyNotProvided extends DataError {
  constructor(prop) {
    super(`${prop} not provided`);
    this.name = this.constructor.name;
  }
}

class DataAlreadyExist extends DataError {
  constructor(prop) {
    super(`${prop} already exist in database`);
    this.name = this.constructor.name;
  }
}
class TypeError extends DataError {
  constructor(prop) {
    super(`${prop} has an invalid type`);
    this.name = this.constructor.name;
  }
}
class ValueError extends DataError {
  constructor(prop) {
    super(`${prop} is an invalid value`);
    this.name = this.constructor.name;
  }
}

module.exports = {
  PropertyNotProvided, DataAlreadyExist, TypeError, ValueError,
};
