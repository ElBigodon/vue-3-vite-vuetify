export default {
  cmd: 'generate',
  args: ['--name'],
  handler(name) {
    console.log(this.args);
  }
}