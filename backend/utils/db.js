// Sets up and exports the PostgreSQL connection pool.
require('dotenv').config();  // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const fs = require('fs');
const pg = require('pg');
const url = require('url');

// Define the PostgreSQL database connection using Sequelize
const sequelize = new Sequelize(
    process.env.DB_URI,  // Database URI from the .env file
    {
        dialect: 'postgres',  // Specifies the database type as PostgreSQL
        logging: false,       // Disables Sequelize logging (can be set to console.log for debugging)
        dialectOptions: {
            ssl: {
                require: true,  // This will help you. But you can choose to not require it.
                ca: fs.readFileSync('./ca.pem').toString(),  // Use the CA certificate (from .env or file path)
            }
        },
    }
);


// const client = new pg.Client(config);
// client.connect(function (err) {
//     if (err)
//         throw err;
//     client.query("SELECT VERSION()", [], function (err, result) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });

// Test the connection to the database
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with failure code if connection fails
    }
};

// Call the testConnection function
testConnection()

module.exports = sequelize;

/*
-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUGMoGAzPxg18ea/IjaCEoAekrf7MwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvN2JjOTk5MTgtOTc0NC00NzA2LTljNmEtM2FiZDk3ZjEx
ZWMwIFByb2plY3QgQ0EwHhcNMjQxMTE4MDAyMjI0WhcNMzQxMTE2MDAyMjI0WjA6
MTgwNgYDVQQDDC83YmM5OTkxOC05NzQ0LTQ3MDYtOWM2YS0zYWJkOTdmMTFlYzAg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKHgWZwo
ERq00jWIvOG5GPjuXAYgZJ0P/Ym4NyspRW1eBnI78aWf5vj1lq0keiubJBDaueX/
KA/U7y23bk7GzQlLnBD5gjNknJkofQnsnvY2RfzBLWGC69+HESDi40YueYz3qlRu
1o30WTqeaLUGojqCTn0bYRSJ4yz9xGupG2JaTsDCQ4PFqRIEVGuMeY3StJRJRTqW
A+8mty4IQvvNSkAuhbvtkqSrE40JkrfqpMZfEcfjjBR6RgfG10FEjpDKaXP8iKMB
N5H/lfHPuZpESGmvU/AUtt46nhut6/UTtfgPB3ftq7UKl+7qMIaxLjSZuFGXNS/A
UIJxvOrS/nRpbz23a2BjwUgVS7emZFbSv4ttorkK6kwlTOzyTmxj7iL9T7htfd8q
K9lno22r82f6aNl7YRUvrQFbKVmHk+NX712tZ7hW05mrkhmtqkBIlF7IAJsgaIX3
t/keCax1MK/02tIn90Zz2R+V7AjIY3gRIp9ksbHn8j8dCC2aSPSZEeWYMwIDAQAB
oz8wPTAdBgNVHQ4EFgQU8O6oSCg0jKKmFXepcFAgBqEdwVMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAF3Gcb/3vXQbFFDp
QX000Ve2HD9e+zFs06jcwyw4izf38PQEaI+WAqWdZmDaaYCKJ78U0c4D8FokkSng
yy88aAbe94C3mxZL70C4jpKqo2KojbZZw0Du3hfzUyUD/mcVMCoF+qaihvvfp+tf
KcEDVOKXAlh9GGCmfHVj87ym1/xYeaLQ9kPXS2xrStULpoeIaG9rNEkG7kzWPjJI
05zCy1k3lCvai8ES6oOI6IyokVxgKyjR5z3r2TBAtHJT7Lh7/dVpYI3C4FPOOakN
fQaAx1ohOv4R5PcAFNkzJWmnqPhopBZ4K2q7Z2NdDnq7VdOO6ICab5sHrZHq8R0n
H5ivrwXcL09OXTQVFnh0ZuGGvqe1ezC/7VuX2KnDPtR/azYqRKYlGZlJ367oyEk2
/zuTMUKINxYMFMnXEBWZVr2pBJ8JwDLg9D98WqNPvwys/94u44V17hP3UMPMNLh5
I2rs/c/vai9DUiSODo17dg8C4h2dmD5t+h67mxZ3FkC+H3fu1g==
-----END CERTIFICATE-----
*/