import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import { connect } from "superagent";

const mongod = new MongoMemoryServer();

export const connect = async () =>{

const URI = await mongod.getUri();

const mongooseOpts = {

    useNewUrlParser : true,
    autoReconnect : true,
    reconnectTries = Number.MAX_VALUE,
    reconnectInterval :1000,
}
};