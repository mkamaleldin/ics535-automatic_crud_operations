import * as utilities from "../utilities";
import {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

let type: UserModel = {
  userID: 0,
  name: ''
}
export default [{
    path: "/api/users",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params,
          ...utilities.checkQuery(req.query, type)
        };
        let accepted: string[] = ['userID', 'name', ];
        let data = await getUsers(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  },

  {
    path: "/api/users",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let accepted: string[] = ['userID', 'name', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, { ...req.params,
          ...req.body
        }));
        await createUsers(body);
        res.status(200).json({success: true, message: 'Created successfully.'});
      }
    ]
  },

  {
    path: "/api/users/:userID",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params,
          ...utilities.checkQuery(req.query, type)
        };
        let accepted: string[] = ['userID', 'name', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateUser(query, body);
        res.status(200).json({success: true, message: 'Updated successfully.'});
      }
    ]
  },

  {
    path: "/api/users/:userID",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params
        };
        await deleteUser(query);
        res.status(200).json({success: true, message: 'Deleted successfully.'});
      }
    ]
  },

];