
const Prompt = require( "prompt" );
const OpenPGP = require( "openpgp" );


module.exports = ( Utils ) => {

    let EncryptionOptions = {
        data: "",
        publicKeys: null,
        privateKeys: null,
    };

    const PrepareOptions = ( keys ) => {
        EncryptionOptions.publicKeys = keys.public;
        EncryptionOptions.privateKeys = keys.private;
        return EncryptionOptions;
    };

    const DecodeKeys = ( keys ) => {
        const publicKey = OpenPGP.key.readArmored( keys.public ).keys;
        const privateKey = OpenPGP.key.readArmored( keys.private ).keys[ 0 ];
        privateKey.decrypt( keys.secret );
        return { 
            public: publicKey,
            private: privateKey
        };
    };


    Prompt.start();

    Prompt.get( [
        {
            name: "message",
            description: "Enter your Message",
            type: "string",
            message: "Message is required",
            required: true
        }
    ], ( error, result ) => {
        if ( error ) {
            console.error( error );
        } else {

            EncryptionOptions.data = result.message;

            Utils.Keys.Read()
                .then( DecodeKeys )
                .then( PrepareOptions )
                .then( OpenPGP.encrypt )
                .then( ( encryptedData ) => {
                    return encryptedData.data;
                })
                .then( ( message ) => {
                    //console.info( message );
                    return Utils.Data.Write( message );
                })
                .then( () => {
                    console.info( "Message is encrypted successfully" );
                })
                .catch( ( error ) => {
                    console.error( error );
                })
            ;
        }
    });
}