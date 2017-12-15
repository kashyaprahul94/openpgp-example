
const Prompt = require( "prompt" );
const OpenPGP = require( "openpgp" );


module.exports = ( Utils ) => {

    let KeysOptions = {
        numBits: 512,
        userIds: [],
        passphrase: ""
    };


    const EncodeKeys = ( keys, secret ) => {
        return { 
            public: keys.publicKeyArmored,
            private: keys.privateKeyArmored, 
            secret: secret
        };
    };


    Prompt.start();

    Prompt.get( [
        {
            name: "name",
            description: "Enter your Name",
            type: "string",
            message: "Username is required",
            required: true
        },
        {
            name: "email",
            description: "Enter your Email",
            type: "string",
            message: "Email is required",
            required: true
        },
        {
            name: "secret",
            description: "Enter your Secret Phrase",
            type: "string",
            message: "Default phrase \"secret\" will be used",
            default: "secret",
            required: true
        }
    ], ( error, result ) => {
        if ( error ) {
            console.error( error );
        } else {
            
            KeysOptions.userIds.push( { name: result.name, email: result.email } );
            KeysOptions.passphrase = result.secret;

            const processingStartTime = new Date().getTime();

            OpenPGP.generateKey( KeysOptions )
                .then( ( keys ) => {
                    return EncodeKeys( keys, result.secret );
                })
                .then( Utils.Keys.Write )
                .then( () => {
                    console.info( "Keys are generated in %d milliseconds", ( new Date().getTime() - processingStartTime ) );
                })
                .catch( ( error ) => {
                    console.error( error );
                })
            ;
        }
    });
}