      import { Request, Response, NextFunction, Router } from "express";
      import { HTTP400Error } from "../models/http400error";

      const handle404Error = (router: Router) => {
          router.use((req: Request, res: Response, next: NextFunction) => {
            if (req.url == '/api/' || req.url == '/api' || req.url.includes('swagger') || req.url.includes('/public')) {
            next();
            return;
        }
              res.status(404).send("Source not found");
          });
      };

      const handleClientError = (router: Router) => {
          router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
              if (err instanceof HTTP400Error) {
                  console.warn(err);
                  res.setHeader('content-type', 'application/json')
                  res.status(400).send(JSON.stringify(err));
              } else {
                  next(err);
              }
          });
      };

      const handleServerError = (router: Router) => {
          router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
              console.error(err);
              res.setHeader('content-type', 'application/json')
              if (process.env.NODE_ENV === "production") {
                  res.status(500).send("Internal Server Error");
              } else {
                  res.status(500).send(err.stack);
              }
          });
      };

      export default [
          handleClientError,
          handleServerError,
          handle404Error,
      ]
    