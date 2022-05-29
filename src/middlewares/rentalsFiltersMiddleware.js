export function getRentalsFilter(req, res, next) {
  res.locals.offset = req.query.offset ? req.query.offset : undefined;
  res.locals.limit = req.query.limit ? req.query.limit : undefined;
  res.locals.status = "WHERE r.id > -1";
  res.locals.order = "id"

  if (req.query.status === "closed") {
    if (req.query.startDate) {
      res.locals.status = `WHERE r."returnDate" IS NOT NULL AND r."rentDate" >= '${req.query.startDate}'`;
    } else {
      res.locals.status = `WHERE r."returnDate" IS NOT NULL`;
    }
  } else if (req.query.status === "open") {
    if (req.query.startDate) {
      res.locals.status = `WHERE r."returnDate" IS NULL AND r."rentDate" >= '${req.query.startDate}'`;
    } else {
      res.locals.status = `WHERE r."returnDate" IS NULL`;
    }
  } else if (req.query.startDate) {
    res.locals.status = `WHERE r."rentDate" >= '${req.query.startDate}'`;
  }

  if (req.query.order) {
    if (req.query.desc) {
      res.locals.order = `"${req.query.order}" DESC`;
    } else {
      res.locals.order = `"${req.query.order}"`;
    }
  }

  next();
}
