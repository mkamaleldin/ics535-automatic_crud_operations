import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
const fileupload = require('express-fileupload')

const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

const handleCompression = (router: Router) => {
  router.use(compression());
};

const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(fileupload());
  router.use(parser.json());
  router.use('/api', function (req: any, res, next) {
    if (req.url == '/' || req.url.includes('swagger')) {
      next();
      return;
    }
    req.headers["accept"] = 'application/json';
    req.headers["content-type"] = 'application/json';
    if (req.files != null) {
      req.headers["content-type"] = 'multipart/form-data';
      Object.entries(req.files).forEach(f => req.body[f[0]] = f[1]);
    }
    res.setHeader('content-type', 'application/json')
    next()
  });
};

export default [
  handleCors,
  handleCompression,
  handleBodyRequestParsing,
]
    