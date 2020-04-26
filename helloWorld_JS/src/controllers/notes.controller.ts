import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

        export async function getNotes(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('Notes', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            export async function createNotes(data: any) {
    try {
      if (data.noteID == null) data.noteID = shortid.generate();
        await service.sqlStorage.sqlCreate('Notes', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            export async function updateNote(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('Notes', query, data);
    } catch (e) {
        throw e;
    }
}
            export async function deleteNote(query: any) {
    try {
        await service.sqlStorage.sqlDelete('Notes', query);
    } catch (e) {
        throw e;
    }
}
                  