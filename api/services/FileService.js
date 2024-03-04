const util = require ('../common/utilities')

async function getFileContent(query){
    let chunk = [];
    let file_list = {files:[]};
    try{
        //query param validation
        if(query.fileName != undefined)
            file_list.files.push(query.fileName);
        else
            file_list =  await util.consume_service(util.URL_FILES);
        //get file details and validations
        if(file_list != util.ERROR && file_list.files.length>0)
        {
            let file_detail = null;
            for(let file of file_list.files){
                file_detail = await util.consume_service(util.URL_FILE_CONTENT+file);
                if(file_detail != util.ERROR){
                    let resp = validate_file(file, file_detail);
                    if(resp.lines.length>0)
                        chunk.push(resp);
                }
            }
        }
    }
    catch(err){
        console.error("Error no controlado", err);
    }
    
    return chunk;
}

function validate_file(file_name, file_detail){
    let file = {file: file_name, lines: []};
    let detail = file_detail.split("\n");
    if(detail.length>1){
        detail.splice(0,1);
        let line = null;
        for(let row of detail){
            line = validate_row(row);
            if(line != null)
                file.lines.push(line);
                
        }
    }
    return file;
}

function validate_row(row){
    let line = null;
    let rows = row.split(",");
    if(rows.length != 4){
        return line; 
    }
    else if(!rows[1].length>0){
        return line;
    }
    else if(rows[2] == null || !rows[2].length>0 || isNaN(rows[2])){
        return line; 
    }
    else if(!rows[3].length>0 || rows[3].length!=32 || !util.REGEX_HEX.test(rows[2])){
        return line; 
    }
    else{
        return line = {
            text: rows[1],
            number: Number(rows[2]),
            hex: rows[3]
        }
    }
}

module.exports  = {getFileContent, validate_file,validate_row};