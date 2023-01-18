import usersRouter from './users.js'
import indexRouter from './index.js'
import carsRouter from './cars.js'
export const routesInit = (app) => {
    app.use('/', indexRouter)
    app.use('/users', usersRouter)
    app.use('/cars', carsRouter)

    app.use((req, res) => {
        res.status(404).json({ msg_err: 'Not Found 404' })
    })
}


// Allows a server in another domain to make requests to our server through a browser
export const corsAccessControl = (app) => {
    app.all('*', (req, res, next) => {
        if (!req.get('Origin')) return next();
        // * -> In reality instead of an asterisk we will enter a domain name that has an access certificate
        // to server
        res.set('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH"); // Allows to get types of requests
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token,x-api-key');
        next();
    });
}