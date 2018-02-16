<?php
include("connect.php");
$date = date('Y-m-d H:i:s');
$data = json_decode(file_get_contents("php://input"),true);
print_r($data);
$po_no = $data['po_no'];
$date1 = $data['date'];
$createdBy = $data['createdBy'];
$inr_rate = $data['inr_rate'];
$conversion_date = $data['conversion_date'];
$id_user = $data['iduser'];

 $query = "insert into user_has_po(po_no,date,createdBy,
createddatetime,inr_rate,conversion_date,id_user) 
values('$po_no','$date1','$createdBy','$date','$inr_rate',
'$conversion_date','$id_user')";
$result = $databaseconnection->query($query);
$array['status'] = true;
$array['message'] = "Data Inserted";


$selectSql = "Select a.*,b.* from bundle as a, user_has_bundle as b
               where a.id=b.id_bundle and b.id_user=$id_user";
$selectResult = $databaseconnection->query($selectSql);
$i = 0;
$admin = [];
while ($row = mysqli_fetch_assoc($selectResult)) {
    $admin['bundleInfo'][$i] = $row;
    $i++;

}


$selectSql = "Select a.*  from user_has_pdf as a
               where a.id_user=$id_user order by id desc limit 0,1";
$selectResult = $databaseconnection->query($selectSql);
$i = 0;
while ($row = mysqli_fetch_assoc($selectResult)) {
    $userpdf = $row;
    

}
$curdate = date('d-m-Y');
/*print_r($userpdf);
exit;*/

$gst = 'IGST';
$gstamount = ((($userpdf[pdf_discounttotal]) / 100) * $userpdf[pdf_gst]);
if (strpos($userpdf[pdf_state], 'Kar') !== false) {
    $gst = 'GST';
    $cgst = $userpdf[pdf_gst]/2;
    $cgstAmount = $gstamount / 2;

}

$finalTotalInWords = amountInwords($userpdf[pdf_finaltotal]);

function amountInWords($number)
{

    $decimal = round($number - ($no = floor($number)), 2) * 100;
    $hundred = null;
    $digits_length = strlen($no);
    $i = 0;
    $str = array();
    $words = array(
        0 => '', 1 => 'one', 2 => 'two',
        3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
        7 => 'seven', 8 => 'eight', 9 => 'nine',
        10 => 'ten', 11 => 'eleven', 12 => 'twelve',
        13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen',
        16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen',
        19 => 'nineteen', 20 => 'twenty', 30 => 'thirty',
        40 => 'forty', 50 => 'fifty', 60 => 'sixty',
        70 => 'seventy', 80 => 'eighty', 90 => 'ninety',
    );
    $digits = array('', 'hundred', 'thousand', 'lakh', 'crore');
    while ($i < $digits_length) {
        $divider = ($i == 2) ? 10 : 100;
        $number = floor($no % $divider);
        $no = floor($no / $divider);
        $i += $divider == 10 ? 1 : 2;
        if ($number) {
            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
            $str[] = ($number < 21) ? $words[$number] . ' ' . $digits[$counter] . $plural . ' ' . $hundred : $words[floor($number / 10) * 10] . ' ' . $words[$number % 10] . ' ' . $digits[$counter] . $plural . ' ' . $hundred;
        } else {
            $str[] = null;
        }

    }
    $Rupees = implode('', array_reverse($str));

    $paise = ($decimal) ? "." . ($words[$decimal]) . ' Paise' : '';

    $amountInWordsss = strtoupper(($Rupees ? $Rupees . 'Rupees ' : '') . $paise);
    return $amountInWordsss;
}

include '../library/mpdf60/mpdf.php';

$table = " <div class='main-wrapper'>
      
    <section>
      <p class='sec-header'> INVOICE </p>
      <div class='top-wrapper'>
        <table class='top-wrapper-table'>
          <tr>
            <td>
              <p>Kind Attn: Mr. $userpdf[pdf_name]</p>
              <p>$userpdf[pdf_institute]</p>
              <p>$userpdf[pdf_address]</p>
              <p>$userpdf[pdf_city] $userpdf[pdf_zip]</p>
              <p>$userpdf[pdf_state]</p>
            </td>
            <td>
              <p>Invoice No: NCSPL/2017-18/014</p>
              <p>Date: $curdate</p>
              <p>PO NO: $po_no</p>
              <p>PO Date: $date1</p>
            </td>
          </tr>
        </table>
        <table class='perticulars-table'>
          <thead>
            <tr>
              <th>Sl.no</th>
              <th colspan='2'>PARTICULARS</th>
              <th>License Term/duration in months</th>
              <th>Quantity ( Number of Licenses)</th>
              <th>Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>";
 $rowspan = count($admin['bundleInfo']);
if ($userpdf[pdf_sas]==1) {
     $rowspan =  $rowspan  +1;
}
          for ($i = 0; $i < count($admin['bundleInfo']); $i++) {
    $j = $i + 1;
    $bundleName = $admin['bundleInfo'][$i]['name'];
    $bundleCode = $admin['bundleInfo'][$i]['code'];
    $table .= "<tr class='no-border'>
              <td>$j</td>
              <td colspan='2'>$bundleName Academic Network Floating License </td>
                 <td>$userpdf[pdf_subscription]</td>
              <td>$userpdf[pdf_qty]</td>";
              if($i==0) {
                  $table .="<td class='price-col' rowspan='$rowspan'>$userpdf[pdf_discounttotal]</td>";
              }
              
            $table .= "</tr>";
}

if ($userpdf[pdf_sas]==1) {
    $j = $i + 1;
    $table .= " <tr class='no-border'>
              <td>$j</td>
              <td colspan='2'>SAS - FDP, Project Guidance for Faculties and Students NCSPL customized support</td>
             <td>$userpdf[pdf_subscription]</td>
              <td>5 Credits</td>
            </tr>";
}


            $table .= "
            <tr>
              <td colspan='5'><b>Total</b></td>
              <td><b>$userpdf[pdf_discounttotal]</b></td>              
            </tr>";

            if (strpos($userpdf[pdf_state], 'Kar') !== false) {
 $table .= "<tr>              
              <td colspan='4' class='text-right'>Add: CGST on above at</td>
              <td>$cgst%</td>
              <td>$cgstAmount</td>              
            </tr>
            <tr>              
              <td colspan='4' class='text-right'>Add: SCGST on above at</td>
              <td>$cgst%</td>
              <td >$cgstAmount</td>              
            </tr>
            <tr>              
              <td colspan='4' class='text-right'>Add: IGST on above at</td>
              <td>18%</td>
              <td >-</td>              
            </tr>";
            } else {
 $table .= "<tr>              
              <td colspan='4' class='text-right'>Add: CGST on above at</td>
              <td>9%</td>
              <td >-</td>              
            </tr>
            <tr>              
              <td colspan='4' class='text-right'>Add: SCGST on above at</td>
              <td>9%</td>
              <td >-</td>              
            </tr>
            <tr>              
              <td colspan='4' class='text-right'>Add: IGST on above at</td>
              <td>$userpdf[pdf_gst]%</td>
              <td >$gstamount</td>              
            </tr>";
            }
           
             $table .= "<tr>              
              <td colspan='4' class='text-right'>Total invoice value</td>
              <td></td>
              <td >$userpdf[pdf_finaltotal]</td>              
            </tr>
            <tr>              
              <td colspan='4' class='text-right'>Less: Aadvance recieved</td>
              <td></td>
              <td >-</td>              
            </tr>
            <tr>              
              <td colspan='5' class='text-right'><b>Balance due</b></td>
              <td>-</td>                            
            </tr>
          </tbody>          
        </table>
        <p class='total-inwords'>$finalTotalInWords</p>
        <pagebreak>
        <p class='notes-header'>Notes :</p>

        <table class='notes-table'>
          <tbody>
            <tr>
              <td>1</td>
              <td>Payment terms - Immediate</td>
            </tr>
            <tr>
              <td>2</td>
              <td><p>Please remit the above sum in Indian Rupee to our current account as per the details below</p>
                <p>Current Account No. 12262560001396</p>
                <p>IFSC Code (neft/rtgs) : HDFC0001226</p>
                <p>HDFC Bank Ltd, 103/31, 26th Main Road, 4th 'T' Block Jayanagar, </p>
                <p>Bangalore - 560 041</p>
                <p>Or, send us the cheque favouring 'NANOCHIP SOLUTIONS PVT LTD'.</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table class='top-wrapper-table bottom-wrapper-table'>
          <tbody>
            <tr>
              <td>
                <p>PAN: AADCN5804F</p>
                <p>GSTIN:29AADCN5804F1ZI </p>
                <p>CIN:U72900KA2011PTC057821 </p>               
              </td>
              <td>
                <p>For Nanochip Solutions Pvt Ltd</p>                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>  
    <footer>
      <p>Hamsa, # 32/2, Ranga Rao Road, Shankarpuram, </p>
      <p>Bangalore - 560 004 · +91-98802 15781, Fax. +91- 80-26611233</p>
      <p><a href='#' title='email'>Email: info@nanochipsolutions.com </a>
        <a href='#' title='email'>Web: www.nanochipsolutions.com </a></p>
    </footer>  
    </div>   
";
 $mpdf = new mPDF();
$mpdf->mPDF('utf-8', 'A4', '', '', '15', '15', '50', '18');

$result = $mpdf->SetHTMLHeader(' 
 <header>
      <div class="logo-wrapper"><img src="nano_logo.png" class="logo"></div>
    </header>  
     
        

');
$result = $mpdf->SetHTMLFooter(' <footer>
      <p>Hamsa, # 32/2, Ranga Rao Road, Shankarpuram, </p>
      <p>Bangalore - 560 004 · +91-98802 15781, Fax. +91- 80-26611233</p>
      <p><a href="#" title="email">Email: info@nanochipsolutions.com </a>
        <a href="#" title="email">Web: www.nanochipsolutions.com </a></p>
    </footer>  

');

$filename = rand(000000,999999);
$stylesheet = file_get_contents('invoice.css'); // external css

$mpdf->WriteHTML($stylesheet, 1);
$mpdf->WriteHTML($table, 2);

$mpdf->Output('/var/www/html/sasnew/pdf/' . $filename . '.pdf', 'F');


?>