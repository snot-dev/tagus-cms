# Tagus CMS

This is a simple CMS using Javascript only! It was developed with Nodejs/Express, Mongo DB and React

## Getting Started

To install the npm package:
```
npm install --save tagus-cms

```

To access your Tagus CMS back office simply navigate to '/tagus-admin'


### Prerequisites

This was developed running node v6.11.1, so at least this is the needed version to run it.

### Installing

Start your standard express app, and extend it with tagus-cms!

```
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const app = express();
const tagusCMS = require('./tagus/tagus-cms');
const portNumber = process.env.PORT_NUMBER;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('SiteName'));

tagusCMS.extend(app, {
  media: {
    path:'SiteName/img',
    dir: '/img',
    root: 'SiteName'
  },
  views: {
    path: [path.join(__dirname, 'SiteName/views')],
    engine: 'hbs'
  },
  public: 'SiteName',
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
  domain: process.env.DOMAIN,
  authSecretKey: process.env.AUTHSECRETORKEY,
  email: {
    email: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});


app.listen(portNumber, function () {  
  console.log("listening to " + portNumber);
});
```

The extend function accepts your Express instance and an object with the following mandatory settings.

```
{
    media: {
        path: "The path where your media files are",
        dir: "The actual directory of your media files,
        root: "The root of your static website files"
    },
    views: {
        path:"The path of your view template files",
        engine: "The view engine you are using"
    },
    public: "The public folder of your website",
    mongoConnectionString: "The connection string for your Mongo db",
    domain: "The domain of your website",
    authSecretKey: "Tagus CMS uses passport and tokens to manage some permissions. Create an auth key to encrypt your tokens",
    email: {
        email: "An email address. This will be necessary in order to send the new users their initial password, so that they can access the Tagus CMS back office",
        pass: "Your email account password"
    }
}
```

## Contributing

Feel free to open the necessary PR!

I'm using the 'https://github.com/snot-dev/project-tagus' repo to develop this app. Feel free to check it out!

## Authors

* **Gonçalo Assunção** - [snot-dev](https://github.com/snot-dev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

Thanks to the following guys, for the help and support:

* **Gonçalo Cardoso** - [gcardoso89](https://github.com/gcardoso89)
* **João Ramalho** - [ramalhovfc](https://github.com/ramalhovfc)
* **Leandro Mendes** - [Pr0fil3](https://github.com/Pr0fil3)
* **Tiago Fernandes** - [vftiago](https://github.com/vftiago)

The Tagus Logo was created by:

**Adolfo Ferreira** - http://www.adolfoferreira.com/

Special thanks to, for the many design inputs:

**Jesús Alfonso Sánchez** - http://www.jasnchz.com/

Enjoy!

