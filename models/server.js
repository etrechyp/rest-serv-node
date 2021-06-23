const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products'
        }
        
        
        this.database();
        this.middlewares();
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.categories, require('../routes/categories.routes'));
        this.app.use( this.paths.users, require('../routes/user.routes'));
        this.app.use( this.paths.products,require('../routes/products.routes'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server run in port ${this.port}`);
        } );
    }
}

module.exports = Server;