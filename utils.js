const FS = require( "fs" );
const Prompt = require( "prompt" );
const Promise = require( "bluebird" );


const File = {
    Write: ( fileName, data ) => {
        return new Promise( ( resolve, reject ) => {
            FS.writeFile( fileName, JSON.stringify( data ), "utf8", ( error ) => {
                if ( error ) {
                    reject( error );
                } else {
                    resolve();
                }
            });  
        });
    },

    Read: ( fileName ) => {
        return new Promise( ( resolve, reject ) => {
            FS.readFile( fileName, "utf8", ( error, data ) => {
                if ( error ) {
                    reject( error );
                } else {
                    resolve( JSON.parse( data ) );
                }
            });  
        });
    }    
};


const Utils = {

    Keys: {
        File: "./data/keys",
        Write: ( keys ) => {
            return File.Write( Utils.Keys.File, keys );
        },
        Read: () => {
            return File.Read( Utils.Keys.File );
        }
    },

    Data: {
        File: "./data/message",
        Write: ( message ) => {
            return File.Write( Utils.Data.File, { message: message } );
        },
        Read: () => {
            return File.Read( Utils.Data.File );
        }
    }
};


module.exports = Utils;
