/**
 *
 * Copyright (c) 2006 - 2015 xinao
 *
 * @category   
 * @package   
 * @copyright 
 * @license    
 * @version   
 */
var express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(30)
