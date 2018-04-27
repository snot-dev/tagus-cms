const fs = require('fs');

module.exports = app => {
    const router = require('express').Router();
    const viewPaths = app.settings.views;
    const viewEngine = app.settings['view engine'];
    
    router.get('/', (req, res) => {
        const templates = [];
        for(const path of viewPaths) {
            const files = fs.readdirSync(path);

            for(const file of files) {
                if( file.split('.').pop() === viewEngine) {
                    const fileName = file.split('.').shift();
                    templates.push(fileName);
                }
            }
        }
        
        res.json({success: true, list:templates});
    });

    return router;
}


