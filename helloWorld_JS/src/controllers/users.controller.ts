import {
  HTTP400Error
} from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";
const shortid = require('shortid');

export async function getUsers(query: any, requestedData: any[]) {
  try {
    return await service.sqlStorage.sqlRead('Users', query, requestedData);
  } catch (e) {
    throw e;
  }
}

export async function createUsers(data: any) {
  try {
    if (data.userID == null) data.userID = shortid.generate();
    await service.sqlStorage.sqlCreate('Users', data)
  } catch (e) {
    if (e.message.includes('Duplicate entry'))
      throw new HTTP400Error(104, 'error: the user already exist in the database')
    throw e;
  }
}
export async function updateUser(query: any, data: any) {
  try {
    await service.sqlStorage.sqlUpdate('Users', query, data);
  } catch (e) {
    throw e;
  }
}
export async function deleteUser(query: any) {
  try {
    await service.sqlStorage.sqlDelete('Users', query);
  } catch (e) {
    throw e;
  }
}