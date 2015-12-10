<?php
//示例：$argv[1] 是文件保存路径 $argv[2]是文件名称；
ini_set("display_errors", "On"); 
error_reporting(E_ALL | E_STRICT);
require_once( dirname(__FILE__) .'/vendor/autoload.php' );

$src = (new \tomk79\excel2html\main($argv[1].$argv[2]))->get_html(array(
    'renderer'=>'simplify'
));

print_r($src);