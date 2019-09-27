let mongoose = require('mongoose');
let mongoConfig = require('../config/mongo');

mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`, { useNewUrlParser: true, useUnifiedTopology: true });