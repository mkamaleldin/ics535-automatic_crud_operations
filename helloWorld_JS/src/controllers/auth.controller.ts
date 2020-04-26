import * as utilities from "../utilities";
import { HTTP400Error } from "../models/http400error";
const shortid = require('shortid');
import services from "../services";


export async function signup(data: any) {
    throw new HTTP400Error(5461, 'the auth type is not supported');
}
async function exceuteSignup(table: any, data: any) {
    try {
        await services.sqlStorage.sqlCreate(table, data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}

export async function login(query: any, authTypes: any[]): Promise<any> {
    if (!authTypes.toString().includes(query.authType) && query.authType != 'Any')
        throw new HTTP400Error(5461, 'the auth type is not supported');
    if (query.id == null || query.password == null)
        throw new HTTP400Error(105, 'user id and password are required');

    if (query.authType == 'Any') {
        for (let i = 0; i < authTypes.length; i++) {
            const table = authTypes[i];
            let newQuery = query;
            newQuery.authType = table;
            try {
                return await login(newQuery, authTypes);
            } catch (e) {
                if (!e.message.includes('No user'))
                    throw e;
            }
        }
        throw new HTTP400Error(6541, 'No user by that information in all types');
    }
}
async function exceuteLogin(table: any, query: any, requestedData: any) {
    try {
        let d = await services.sqlStorage.sqlRead(table, query, requestedData)
        if (d.length == 0)
            throw new HTTP400Error(1075, 'No user by that information')
        let token = utilities.getToken(d[0][Object.entries(d[0])[0][0]]);
        d = {
            token: token,
            profile: d
        }
        return d;
    } catch (e) {
        throw e;
    }
}

        