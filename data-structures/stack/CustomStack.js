export default class CustomStack extends Array {
  constructor() {
    super();
  }

  isEmpty() {
    return this.length === 0 ? true : false;
  }
}
