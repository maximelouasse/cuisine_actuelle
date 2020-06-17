/*
Imports
*/
    // NodeJS
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const ejs = require('ejs');

    // Inner
    const { mainRouter } = require('./routes/main.router');

//

/*
Server Configuration
*/
    // Define server
    const port = process.env.PORT;
    const server = express();

    // Define server class
    class ServerClass {
        // Initialization fonction
        init() {
            // View engine configuration
            server.engine( 'html', ejs.renderFile );
            server.set('view engine', 'html');

            // Static path configuration
            server.set( 'views', __dirname + '/www' );
            server.use( express.static(path.join(__dirname, 'www')) );

            //=> Use BodyParser to get user body data
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));

            //=> Set server main router
            server.use('/', mainRouter);

            // Start server
            this.launch();
        }

        launch() {
            // Launch server
            server.listen(port, () => console.log({
                server: `Server is running on port ${port}` 
            }))
        }
    }
//

/*
Start server
*/
    new ServerClass().init();
//