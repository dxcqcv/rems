<?php

ini_set("display_errors", "On"); 
error_reporting(E_ALL | E_STRICT);
require_once( dirname(__FILE__) .'/vendor/autoload.php' );

$src = (new \tomk79\excel2html\main('/Users/lvwei/Develop/github/rems/data/upload/'.$argv[1]))->get_html(array(
    'renderer'=>'simplify'
));

print_r($src);