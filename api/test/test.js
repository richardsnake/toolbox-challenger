const expect = require('chai').expect;
const assert = require('chai').assert;

const util = require('../common/utilities.js');
const service = require('../services/FileService.js');

describe('testing de metodo de consumo de servicio', function(){

    it("1. consumir servicio que trae lista de archivos",function(done){
        util.consume_service(util.URL_FILES).then(response => {
            expect(response.files.length).to.equals(9);
        });
        done();
    });

    it("2. consumir el servicio que trae el detalle del archivo test1.csv", function(done){
        util.consume_service(util.URL_FILE_CONTENT+"test1.csv").then(response =>{
            assert.equal(response, "file,text,number,hex");
        });
        done();
    });
    it("3. consumir el servicio que trae el detalle del archivo test2.csv", function(done){
        util.consume_service(util.URL_FILE_CONTENT+"test2.csv").then(response =>{
            assert.equal(response, "file,text,number,hex\ntest2.csv,NjYXs\ntest2.csv,EpEYVeUmNl,618517,45ee59f5f2ba61cdeb2b373d6a90755a");
        });
        done();
    });

    it("4. consumir el servicio que trae el detalle del archivo test4.csv con error", function(done){
        util.consume_service(util.URL_FILE_CONTENT+"test4.csv").then(response =>{
            assert.equal(response.code, "API-500");
        });
        done();
    });

    it("5. consumir el servicio que trae el detalle del archivo test7.csv con error", function(done){
        util.consume_service(util.URL_FILE_CONTENT+"test7.csv").then(response =>{
            assert.equal(response.code, "SYS-ERR");
        });
        done();
    });

    it("6. validar que una fila de un archivo tenga los datos formateados incorrectos", function(done){
        let resp = service.validate_row("file,text,number,hex");
        expect(resp).to.equals(null);
        done();
    });

    it("7. validar que una fila de un archivo tenga los datos formateados correctos", function(done){
        let resp = service.validate_row("test2.csv,EpEYVeUmNl,618517,45ee59f5f2ba61cdeb2b373d6a90755a");
        assert.deepEqual(resp, { text: 'EpEYVeUmNl', number: 618517,hex: '45ee59f5f2ba61cdeb2b373d6a90755a'});
        done();
    });

    it("8. validar que un archivo y que devuelva los datos formateados correctos y genere el json de respuesta - test2.csv", function(done){
        let resp = service.validate_file("test2.csv", "file,text,number,hex\ntest2.csv,NjYXs\ntest2.csv,EpEYVeUmNl,618517,45ee59f5f2ba61cdeb2b373d6a90755a\n");
        assert.deepEqual(resp,{file:'test2.csv', lines: [{ text: 'EpEYVeUmNl', number: 618517,hex: '45ee59f5f2ba61cdeb2b373d6a90755a'}]});
        done();
    });

    it("9. validar que se busque solo un archivo  y devuelva los datos formateados correctos y genere el json de respuesta - test2.csv", function(done){
        let resp = service.getFileContent({fileName: "test2.csv"}).then(response =>{
            assert.deepEqual(resp,{file:'test2.csv', lines: [{ text: 'EpEYVeUmNl', number: 618517,hex: '45ee59f5f2ba61cdeb2b373d6a90755a'}]});
        });
        done();
    });

    it("10. validar que se busque toda la lista de archivos y devuelva tenga los datos formateados correctos y genere el json de respuesta - test2.csv", function(done){
        let resp = service.getFileContent({}).then(response =>{
            assert.deepEqual(resp,[{"file":"test2.csv","lines":[{"text":"EpEYVeUmNl","number":618517,"hex":"45ee59f5f2ba61cdeb2b373d6a90755a"}]},
                    {"file":"test3.csv","lines":[{"text":"qGIABIhwxxCm","number":3810723131,"hex":"0b3dc491b3d79cc1d9b2c180dc7b2741"},
                    {"text":"pOnMiTILNaG","number":5,"hex":"4d5f3eebe32a303c92058954eb5608b7"},{"text":"EGpDYqPmHtoplglqFtuvao","number":761779,"hex":"ee0a8264d1f07cad70941c40a4dcdba5"}]},
                    {"file":"test9.csv","lines":[{"text":"oqMXPBfptDjiJwpLjgwi","number":4767286,"hex":"41775bae1bfeae8630943b120c4cf41f"},
                    {"text":"kkwgLBobauwwXPTLpZMcXwxe","number":3,"hex":"3f2f6693a634566f3081d0a5c3cb848f"},{"text":"jGszpEJbiBScupsjfQa","number":979014,"hex":"777adc03e493b4a5ed78737e60a54db9"},
                    {"text":"tqPvEolLCeQOpIQUdgOvfcLJREkdv","number":1342435,"hex":"afb14acda9603b3a08cae397aa85a0f0"},{"text":"WD","number":60260190,"hex":"f007e855fdfe60c47e268d4c2b4f7299"},
                    {"text":"TFVwImZhikJDTsPGirOlzaYTJapfgFeQ","number":78746,"hex":"cf5b3dfdc0d1df93c52b0b429bb65dae"},{"text":"WiEmLKaPlZxCOTwmYB","number":698,"hex":"891e8d9ae12db34c6bad1119f5562046"},
                    {"text":"BaIETKRFz","number":5628892,"hex":"3887b061c927977b1fdf526771eea891"},{"text":"DcfunxfMAF","number":17218952,"hex":"6389237befcc0de964382acffea719de"},
                    {"text":"aZRJ","number":5049656784,"hex":"3c31e6df89bbec4baba33159b77a2373"},{"text":"vvnHnnIHKcPeQPjNDLGYrgQOCOOCN","number":7624,"hex":"7784b738e607d3b0e8a9259cc800ba17"}]}]);
        });
        done();
    });

    //getFileContent
    
});