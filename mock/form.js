function form(req) {
  let res = null;
  switch (req.method) {
    case "POST":
      res = { message: "OK" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = form;
