
const Prompt = require( "prompt" );
const OpenPGP = require( "openpgp" );


module.exports = ( Utils ) => {

    let DecryptionOptions = {
        message: "",
        publicKeys: null,
        privateKey: null,
    };

    const PrepareOptions = ( keys ) => {
        DecryptionOptions.publicKeys = keys.public;
        DecryptionOptions.privateKey = keys.private;
        return DecryptionOptions;        
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

    const DecodeMessage = ( message ) => {
        return OpenPGP.message.readArmored( message );
    };


    Utils.Data.Read()
        .then( ( encryptedMessage ) => {
            return encryptedMessage.message;
        })
        .then( ( message ) => {
            return DecodeMessage( message );
        })
        .then( ( message ) => {
            DecryptionOptions.message = message;
        })
        .then( Utils.Keys.Read )
        .then( DecodeKeys )
        .then( PrepareOptions )
        .then( OpenPGP.decrypt )
        .then( ( decryptedData ) => {
            return decryptedData.data;
        })
        .then( ( message ) => {
            console.info( "Message is decrypted successfully : %s", message );
        })
        .catch( ( error ) => {
            console.error( error );
        })
    ;
}