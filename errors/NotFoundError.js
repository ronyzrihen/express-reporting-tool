// eslint-disable-next-line max-classes-per-file
class NotFound extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 404;
  }
}

class PropertyNotFound extends NotFound {
  constructor(props) {
    super(`${props} was not found`);
    this.name = this.constructor.name;
    this.prop = props;
  }
}

module.exports = { PropertyNotFound };
