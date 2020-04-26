import { Router, Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../models/http400error";
const jwt = require('jsonwebtoken')

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    (router as any)[route.method](route.path, route.handler);
  }
};

export function getToken(id: any): string {
  const payload = { id: id };
  const options = { expiresIn: '1 week' };
  const secret = process.env.secretKey;
  return jwt.sign(payload, secret, options);
}

export function verifyToken(id: any, token: string) {
  try {
    const options = { expiresIn: '1 week' };
    const secret = process.env.secretKey;
    let result = jwt.verify(token, secret, options);
    let isUser = (id == result.id);
    if (!isUser) throw '';
  } catch (e) {
    throw new HTTP400Error(101, "error: you are not authorized to this endpoint");
  }
}

export async function storeFile(file: any) {
  try {
    let fileType = file.mimetype.includes('image') ? 'images/' : '';
    await new Promise((resolve, reject) => {
      file.mv(process.cwd() + '/public/' + fileType + file.name, async (err: any) => {
        if (err) reject(new Error('file upload failed'))
        resolve()
      })
    })
    return process.env.hostname + '/public/' + fileType + file.name;
  } catch (e) {
    throw new HTTP400Error(1, 'file upload is failed');
  }
}

export async function checkBody(body: any, type: any, params: any = null) {
  let dbBody: any = {}
  for (const ii in Object.entries(body)) {
    if (Object.entries(body).hasOwnProperty(ii)) {
      const b: any = Object.entries(body)[ii];
      for (const i in Object.entries(type)) {
        let t: any = Object.entries(type)[i];
        if (b[0] == t[0] &&
          typeof b[1] == typeof t[1] &&
          b[1] != null &&
          ('' + b[1]).toString().length > 0) {
          if ((typeof b[1]).toString() == 'object') {
            if (!b[1].mimetype.includes(t[1].mimetype)) continue;
            let id = '';
            Object.entries(params).forEach(p => {
              if (p[0].includes('ID'))
                id += (p[1] + '-')
            })
            b[1].name = id + b[0] + '.' + b[1].mimetype.substring(b[1].mimetype.indexOf('/') + 1);
            b[1] = await storeFile(b[1]);
          }
          dbBody[b[0]] = b[1];
          continue;
        }
      }
    }
  }
  return dbBody;
}

export function checkQuery(query: any, type: any) {
  let dbQuery: any = {}
  Object.entries(query).forEach((q: any) => {
    for (const i in Object.entries(type)) {
      let t = Object.entries(type)[i];
      if (q[0] == t[0] || q[0] == 'limit' || q[0] == 'page' || q[0] == 'sort' || q[0] == 'order') {
        try {
          if (q[0] == 'limit' || q[0] == 'page') {
            q[1] = parseInt(q[1]);
            if (q[1].toString() == 'NaN')
              throw '';
          }
          else if (q[0] == 'sort') {
            let newList: any = [];
            let list = q[1].split(',');
            list.forEach((l: string) => {
              Object.entries(type).forEach(tt => {
                if (tt[0] == l)
                  newList.push(tt[0]);
              })
            });
            if (newList.length == 0) throw '';
            q[1] = newList.toString();
          }
          else if (q[0] == 'order') {
            if (q[1] != 'ASC' || q[1] != 'DESC')
              throw '';
          }
          else if (typeof t[1] == 'number') {
            q[1] = parseInt(q[1]);
            if (q[1].toString() == 'NaN')
              throw '';
          }
        } catch (e) {
          continue;
        }
        dbQuery[q[0]] = q[1];
        break;
      }
    }
  })
  return dbQuery;
}

export function acceptedBody(acceptedBody: any[], body: any) {
  let newBody: any = {};
  for (const i in Object.entries(body)) {
    const b = Object.entries(body)[i];
    let isAccepted = false;
    for (const ii in acceptedBody) {
      const a = acceptedBody[ii];
      if (b[0] == a) {
        isAccepted = true;
        break;
      }
    }
    if (isAccepted)
      newBody[b[0]] = b[1];
  }
  return newBody;
}
    
    