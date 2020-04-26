      import { Router } from "express";
      import express from "express";
      import swaggerUi from "swagger-ui-express";
      import swaggerDocument from "../config/swagger.json";

      export const handleResources = (router: Router) =>
          router.use('/public', express.static('public'));


      export const handleSwagger = (router: Router) =>
          router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


      export default [
          handleSwagger,
          handleResources,
      ]
    