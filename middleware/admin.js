// 401 (unauthorise)--> qachonki userda yaroqli token bolmaganda
// 403 (forbidden)--> qachonki userda yaroqli token bolsa lekin ruhsat bolmasa
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).json({ success: false, message: "Murojaat rad etildi." });
  next();
};
