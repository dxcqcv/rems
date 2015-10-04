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

var express=require("express"),app=express();app.get("/",function(e,t){t.send("Hello World")}),app.listen(30);