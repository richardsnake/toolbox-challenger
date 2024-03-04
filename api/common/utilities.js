const axios = require('axios');

const URL_FILES = 'https://echo-serv.tbxnet.com/v1/secret/files';
const URL_FILE_CONTENT = 'https://echo-serv.tbxnet.com/v1/secret/file/';
const HTTP_GET_METHOD = 'GET';
const HEADERS = {
    'Content-type':'application/json',
    'Authorization': 'Bearer aSuperSecretKey'
};
const OPTION_FILES = {
    method: HTTP_GET_METHOD,
    headers : HEADERS
}

const REGEX_HEX = /^[0-9a-fA-F]+$/;
const ERROR = "ERROR"

async function consume_service(url){
    let info = null;
    try{
        let response = await axios.get(url, OPTION_FILES);
        info = response.data;
    }
    catch(err){
        console.error("Error al consumir contenido de archivo: ",err.response.data);
        info = ERROR;
    }
    return info;
}

module.exports  = {consume_service, URL_FILES, URL_FILE_CONTENT, REGEX_HEX, ERROR};