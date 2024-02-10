class NotImplementedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
    this.status = 501;
  }
}

module.exports = { NotImplementedError };
