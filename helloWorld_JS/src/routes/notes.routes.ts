import * as utilities from "../utilities";
      import { getNotes, createNotes, updateNote, deleteNote,  } from "../controllers/notes.controller";

                      let type: NoteModel = 
              {noteID: 0, title: '', notes: ''}            
      export default [ 
                  {
            path: "/api/notes",
            method: "get",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'title', 'notes', ];
        let data = await getNotes(query, accepted);
        res.status(200).send(JSON.stringify(data));
                        }
            ]
          },

                    {
            path: "/api/notes",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                        let accepted: string[] = ['noteID', 'title', 'notes', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, {...req.params, ...req.body}));
        await createNotes(body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/notes/:noteID",
            method: "put",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = ['noteID', 'title', 'notes', ]
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await updateNote(query, body);
        res.status(200).send();
                        }
            ]
          },

                    {
            path: "/api/notes/:noteID",
            method: "delete",
            handler: [
              async (req: any, res: any) => {
                        let query = { ...req.params};
        await deleteNote(query);
        res.status(200).send();
                        }
            ]
          },

                ];
      