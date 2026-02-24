import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Invalid User",
        success: false,
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; //{id,role}
    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const authorized = async (req, res,next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only!",
      success: false,
    });
  }

  next();
};

export { authorized, authenticate };
