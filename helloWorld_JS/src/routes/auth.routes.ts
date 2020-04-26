import { login, signup } from "../controllers/auth.controller";



export default [
  {
    path: "/api/auth/signup",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let acceptedAuthTypes: string[] = [];
                if (req.body.authType != null)
                  req.body.authType = req.body.authType[0].toUpperCase() + req.body.authType.substring(1);
                else
                  req.body.authType = acceptedAuthTypes[0];
                await signup({ ...req.body, ...req.params });
                res.status(200).send();
              }
            ]
          },
          {
            path: "/api/auth/login",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                let acceptedAuthTypes: string[] = [];
                if (req.body.authType != null)
                  req.body.authType = req.body.authType[0].toUpperCase() + req.body.authType.substring(1);
                else
                  req.body.authType = 'Any';
                let data = await login(req.body, acceptedAuthTypes);
                res.status(200).send(data);
              }
            ]
          },
        ];
        