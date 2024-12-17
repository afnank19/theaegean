import experimentalRoutes from "../api/routes/exp.js";
import blogRoutes from "../api/routes/blogRoutes.js";
import userRoutes from "../api/routes/userRoutes.js";
import sessionRoutes from "../api/routes/sessionRoutes.js";
import externalRoutes from "../api/routes/externalRoutes.js";

function loadRoutes(app) {
  // pp.use("/api", experimentalRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/session", sessionRoutes);
  app.use("/api/external-services", externalRoutes);
}

export default loadRoutes;
