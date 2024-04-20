
export const catchAsync = (fn) => async (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
}