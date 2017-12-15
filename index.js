
const ARGV = require( "yargs" ).argv;

const Utils = require( "./utils" );

const action = ARGV.action || "DEFAULT";


if (  action === "GENERATE_KEYS" ) {
    require( "./generate-keys" )( Utils );
} else if (  action === "ENCRYPT" ) {
    require( "./encrypt" )( Utils );
} else if (  action === "DECRYPT" ) {
    require( "./decrypt" )( Utils );
} else {
    console.info( "Nice Sercasm !!" );
}