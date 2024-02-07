// eslint-disable-next-line max-classes-per-file
class AlreadyExistsError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class IDExistError extends AlreadyExistsError {
  constructor() {
    super('ID Already Exist in data base');
    this.name = this.constructor.name;
  }
}

module.exports = { IDExistError };
