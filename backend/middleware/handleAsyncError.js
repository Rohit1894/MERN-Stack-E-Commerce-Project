export default (myErrorFun) => (req, res, next) => {
    prosmise.resolve(myErrorFun(req, res, next)).catch(next);
}