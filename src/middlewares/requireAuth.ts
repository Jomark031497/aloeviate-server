import { Request, Response, NextFunction } from "express";

/**
 * check if the user is authenticated
 */
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // return 401 if user is not authenticated

  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "No authentication token. Authorization denied" });
  }

  console.log(req.isAuthenticated());
  return next();
};

export default requireAuth;
