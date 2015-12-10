<?php
/**
 * PHPExcel
 *
 * Copyright (c) 2006 - 2015 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    ##VERSION##, ##DATE##
 */
/** Error reporting */
// error_reporting(E_ALL);
// ini_set('display_errors', TRUE);
// ini_set('display_startup_errors', TRUE);
// date_default_timezone_set('Europe/London');
// // if (PHP_SAPI == 'cli')
// // 	die('This example should only be run from a Web Browser');
// /** Include PHPExcel */
// require_once dirname(__FILE__) . '/Classes/PHPExcel.php';
// // Create new PHPExcel object
// $objPHPExcel = new PHPExcel();
// // Set document properties
// $objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
// 							 ->setLastModifiedBy("Maarten Balliauw")
// 							 ->setTitle("Office 2007 XLSX Test Document")
// 							 ->setSubject("Office 2007 XLSX Test Document")
// 							 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
// 							 ->setKeywords("office 2007 openxml php")
// 							 ->setCategory("Test result file");
// // Add some data
// $objPHPExcel->setActiveSheetIndex(0)
//             ->setCellValue('A1', 'Hello')
//             ->setCellValue('B2', 'world!')
//             ->setCellValue('C1', 'Hello')
//             ->setCellValue('D2', 'world!');
// // Miscellaneous glyphs, UTF-8
// $objPHPExcel->setActiveSheetIndex(0)
//             ->setCellValue('A4', 'Miscellaneous glyphs')
//             ->setCellValue('A5', 'éàèùâêîôûëïüÿäöüç');
// // Rename worksheet
// $objPHPExcel->getActiveSheet()->setTitle('Simple');
// // Set active sheet index to the first sheet, so Excel opens this as the first sheet
// $objPHPExcel->setActiveSheetIndex(0);
// // Redirect output to a client’s web browser (Excel2007)
// header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// header('Content-Disposition: attachment;filename="01simple.xlsx"');
// header('Cache-Control: max-age=0');
// // If you're serving to IE 9, then the following may be needed
// header('Cache-Control: max-age=1');
// // If you're serving to IE over SSL, then the following may be needed
// header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
// header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
// header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
// header ('Pragma: public'); // HTTP/1.0
// $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
// $objWriter->save('php://output');


//使用：$argv[1] 是上传路径  $argv[2] 是excel文件夹名字  $argv[3] 是写入的数据

ini_set("display_errors", "On"); 
ini_set ('memory_limit', '256M');
error_reporting(E_ALL | E_STRICT);
require_once dirname(__FILE__) . '/vendor/phpoffice/phpexcel/Classes/PHPExcel.php';


date_default_timezone_set('Asia/ShangHai');
 
/** PHPExcel_IOFactory */
require_once dirname(__FILE__) . '/vendor/phpoffice/phpexcel/Classes/PHPExcel/IOFactory.php';
 
//$string = "a1,a2,a3,,,,,,,,,,,,a15;,,,,,,,,,,b11,b12,b13,b14,b15;c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15";
$filename = $argv[1];
$string = $argv[2];
$new_arr = explode(";",$string);
//print_r(count($new_arr));die;
// Check prerequisites
//echo file_exists(dirname(__FILE__) . "/111.xls");die;
if (!file_exists(dirname(__FILE__) . "/111.xls")) {
	
	//exit("not found 111.xls.\n");
	echo "not found";
}else{
	$reader = PHPExcel_IOFactory::createReader('Excel5'); //设置以Excel5格式(Excel97-2003工作簿)
	//$reader = PHPExcel_IOFactory::createReader('Excel2007');
	$excelFile = dirname(dirname(__FILE__)).'/PHPExcel.php';
	$PHPExcel = $reader->load(dirname(__FILE__) . "/111.xls"); // 载入excel文件
	$sheet = $PHPExcel->getSheet(0); // 读取第一個工作表
	$highestRow = $sheet->getHighestRow(); // 取得总行数
	//$mergeCell = $sheet->getMergeCells();//取得合并单元格	
	$highestColumm = $sheet->getHighestColumn(); // 取得总列数
	
	/** 循环读取每个单元格的数据 */
	for ($row = 5; $row < (count($new_arr)+5); $row++){//行数是以第1行开始
		//print_r("iii");die;
		$hangArray = explode(",",$new_arr[$row-5]);
	    for ($column = 'A'; $column <= $highestColumm; $column++) {//列数是以A列开始
	    	//$columnTag = 0;
	    	//echo $sheet->getCell($column.$row)->getValue();
	    	//print_r(explode(",",$new_arr[$tag][$columnTag]));
	    	$sheet->setCellValue($column.$row, $hangArray[getalphnum($column)]);
	    	//$tag++;
	        //$dataset[] = $sheet->getCell($column.$row)->getValue();
	        //echo $column.$row.":".$new_arr[$row-5])[$tag]."<br />";
	    }   
	}
}



function getalphnum($char){
	$array=array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
	$len=strlen($char);
	$sum = 0;
	for($i=0;$i<$len;$i++){
		$index=array_search($char[$i],$array);
		$sum+=($index)*pow(26,$len-$i-1);
	}
	return $sum;
}





 $objWriter = PHPExcel_IOFactory::createWriter($PHPExcel, 'Excel5');
// ob_start();
// header("Content-Type: application/force-download");
// header("Content-Type: application/octet-stream");
// header("Content-Type: application/download");
// header('Content-Disposition:attachment;filename="111.xls"');//输出模板名称
// header("Content-Transfer-Encoding: binary");
// header("Last-Modified:".gmdate("D, d M Y H:i:s")." GMT");
// header('Pragma: public');
// header('Expires: 30');
// header('Cache-Control: public');
 $objWriter->save("result.xls");


 
// print_r($dataset);die;
// //return $dataset;

// function get_pos($ar) {
//     $col = $row = array();
//     foreach($ar as $v) {
//         preg_match_all('/([A-Z]+)(\d+):([A-Z]+)(\d+)/', $v, $r);
//         $col = array_merge($col, $r[1], $r[3]);
//         $row = array_merge($row, $r[2], $r[4]);
//     }
//     return array(min($col), max($row));
// }

// print_r(get_pos($mergeCell));

// try {
//     if ( $argc > 1 )
//     {
//         $date = $argv[1];
//     } else {
//         $dt = new DateTime();   
//         $date = $dt->format("Y-m-d"); 
//     }
//     echo $date;
// } catch ( Exception $e ) 
// { 
//     printf("error\n");
// }
?>