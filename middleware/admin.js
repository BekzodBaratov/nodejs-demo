// 401 (unauthorise)--> qachonki userda yaroqli token bolmaganda
// 403 (forbidden)--> qachonki userda yaroqli token bolsa lekin ruhsat bolmasa
module.exports = function (req, res, next) {
  console.log(req);
  if (!req.user.isAdmin) return res.status(403).json({ success: false, message: "Murojaat rad etildi." });
  next();
};
