<?php
include "connect.php";
setlocale(LC_MONETARY, 'en_IN');
$data = json_decode(file_get_contents('php://input'), true);

$date = date('d/m/Y');

$oneMonth = date("d/m/Y", strtotime(" +1 months"));

$pdf_user = $data['iduser'];
$ref_no = $data['ref_no'];
$pdf_name = $data['pdf_name'];
$pdf_design = $data['pdf_design'];
$pdf_institute = $data['pdf_institute'];
$pdf_address = $data['pdf_address'];
$pdf_city = $data['pdf_city'];
$pdf_state = $data['pdf_state'];
$pdf_zip = $data['pdf_zip'];
$pdf_sub = $data['pdf_sub'];
$pdf_sas = $data['pdf_sas'];
$pdf_qty = $data['pdf_qty'];
$pdf_total = $data['pdf_total'];
$pdf_discount = $data['pdf_discount'];
// $pdf_discounttotal = $data['pdf_discounttotal'];
$pdf_gst = $data['pdf_gst'];
//$pdf_finaltotal = $data['pdf_finaltotal'];
$pdf_subscription = $data['pdf_subscription'];
$pdf_validity_date = date("Y-m-d", strtotime(" +1 months"));

$gst = 'IGST';
if (strpos($pdf_state, 'Kar') !== false) {
    $gst = 'GST';
}

$pdf_discounttotal = ($pdf_total - $pdf_discount);
$gst_amount = ((($pdf_discounttotal) / 100) * $pdf_gst);
$pdf_finaltotal = $pdf_discounttotal + $gst_amount;

echo $InsertQuery = "insert into user_has_pdf(ref_no,pdf_name,pdf_design,
    pdf_institute,pdf_address,pdf_city,pdf_state,pdf_zip,pdf_sub,pdf_sas,pdf_qty,
    pdf_total,pdf_discount,pdf_discounttotal,pdf_gst,pdf_finaltotal,pdf_subscription,pdf_validity_date,id_user)
    values('$ref_no','$pdf_name','$pdf_design','$pdf_institute',
    '$pdf_address','$pdf_city','$pdf_state','$pdf_zip','$pdf_sub','$pdf_sas','$pdf_qty',
    '$pdf_total','$pdf_discount','$pdf_discounttotal','$pdf_gst','$pdf_finaltotal','$pdf_subscription','$pdf_validity_date','$pdf_user')";

$result = $databaseconnection->query($InsertQuery);
$array['status'] = true;
$array['message'] = "Data Inserted";

$selectSql = "Select a.*,b.* from bundle as a, user_has_bundle as b
               where a.id=b.id_bundle and b.id_user=$pdf_user";
$selectResult = $databaseconnection->query($selectSql);
$i = 0;
$admin = [];
while ($row = mysqli_fetch_assoc($selectResult)) {
    $admin['bundleInfo'][$i] = $row;
    $i++;

}

$discountInWords = amountInWords($pdf_discount);

$amountAfterDiscountInWords = amountInWords($pdf_discounttotal);
$finalTotalInWords = amountInwords($pdf_finaltotal);

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

$pdf_total = money_format('%!i', $pdf_total);
$pdf_discount = money_format('%!i', $pdf_discount);
$pdf_discounttotal = money_format('%!i', $pdf_discounttotal);
$pdf_finaltotal = money_format('%!i', $pdf_finaltotal);
$gst_amount = money_format('%!i', $gst_amount);

$table = "<section>
        <div class='date-block'>
          <p>Bangalore</p>
          <p>Date: $date</p>
        </div>
        <p style='margin-bottom: 5px'><b>Ref:</b> $ref_no</p>
        <p>To,</p>
        <p><b>$pdf_name</b></p>
        <p><b>$pdf_design</b></p>
        <p>$pdf_institute</p>
        <p>$pdf_address</p>
        <p> $pdf_city - $pdf_zip</p>
        <p style='margin:12px 0'><b>Kind Attention :</b>$pdf_design $pdf_name </p>
        <p>Dear Sir / Madam,</p>
        <p style='margin-bottom:12px'><b>Sub. :  $pdf_sub </b></p>
        <p>We take this opportunity to thank you for the interest of Synopsys VLSI Design Software
        Please find the best offer to your Institution attached.</p>
        <p style='margin-bottom:12px'>
        Kindly contact us for clarifications and further details required about the products and
        the quoted prices.</p>
        <p style='margin-bottom:12px'>Nanochip Solutions Pvt Ltd – Bangalore, is a technology solutions provider company
        having expertise in meeting the needs of Academia, Corporates and GOI in the field of
        VLSI and Embedded Systems Design, Design Services and VLSI Training services and
        solutions.</p>
        <p style='margin-bottom:12px'>We are closely associated with Academia in bridging the gap between Industry and
        Academia through our regular interactions in terms of VLSI Training , EDA tools Sales
        Support Installation Training , Faculty Development programs in VLSI and Embedded
        Systems using state-of-the art EDA tools, FPGA’s and System Level Software.</p>
        <p style='margin-bottom:12px'>We are very pleased to introduce ourselves as the Sole Authorized representative of
        M/s Synopsys International Ltd. Ireland for their products in SOUTH India for Academics.</p>
      </section><pagebreak>";

/*    $table.="<section>
<h4 style='font-size: 16px;text-decoration: underline;color: #11b050'>Synopsys’s University Bundle for VLSI Design – Quotation</h4>
</section>";
 */

$table .= "<section>
        <h4 style='font-size: 15px;text-decoration: underline;color: #11b050;margin-bottom:10px;text-align: center'>Synopsys’s University Bundle for VLSI Design – Quotation</h4>
        <table class='quoted-table'>
          <thead>
            <tr>
              <th>Sl#</th>
              <th>Product Code</th>
              <th>Product Description</th>
              <th>Quantity</th>
              <th>Price in INR ( Rupees )</th>
            </tr>
          </thead>
          <tbody>";
          $rowspan = count($admin['bundleInfo']);
if ($pdf_sas) {
     $rowspan =  $rowspan  +1;
}
for ($i = 0; $i < count($admin['bundleInfo']); $i++) {
    $j = $i + 1;
    $bundleName = $admin['bundleInfo'][$i]['name'];
    $bundleCode = $admin['bundleInfo'][$i]['code'];
    $table .= "<tr>
              <td>$j</td>
              <td>$bundleCode</td>
              <td>$bundleName Academic Network Floating License </td>
              <td>$pdf_qty</td>";
              if($i==0) {
                  $table .="<td class='price-col' rowspan='$rowspan'>$pdf_total</td>";
              }
              
            $table .= "</tr>";
}

if ($pdf_sas) {
    $j = $i + 1;
    $table .= " <tr>
              <td>$j</td>
              <td>SAS</td>
              <td>SAS – Re-installation, tool bring-up, customised NCSPL support - 5 credits</td>
              <td>1</td>
            </tr>";
}
$table .= "
            <tr>
              <td colspan='4' class='text-strong-left'>Total</td>
              <td class='font-strong price-col'>$pdf_total</td>
            </tr>
             <tr>
              <td colspan='4' class='text-strong-left'>Discount – offered ($discountInWords Only)</td>
              <td class='font-strong price-col'>$pdf_discount</td>
            </tr>
            <tr>
              <td colspan='4' class='text-strong-left'>TOTAL( After discount ) $amountAfterDiscountInWords Only</td>
              <td class='font-strong price-col'>$pdf_discounttotal</td>
            </tr>
            <tr>
              <td colspan='4' class='text-strong-left'>Add : $gst @ $pdf_gst % on Rs. $pdf_discounttotal/-</td>
              <td class='font-strong price-col'>$gst_amount</td>
            </tr>
            <tr>
              <td colspan='4' class='text-strong-left '>Grand Total</td>
              <td class='font-strong price-col'>$pdf_finaltotal</td>
            </tr>
          </tbody>
        </table>
        <div class='final-price-block'>
          <p><b>Grand Total amount in words: (Inclusive of Taxes)</b></p>
          <p>Rupees $finalTotalInWords Only</p>
        </div>
      </section>
<pagebreak>
      <!-- VLSI Design – Quotation section here -->
      <section>
        <h4 style='font-size: 15px;text-decoration: underline;color: #11b050;margin-bottom:10px;text-align: center'>TERMS and Conditions</h4>
        <table class='quoted-table terms-table'>
            <tbody>
              <tr>
                <td>1</td>
                <td>F.O.R.</td>
                <td>Your Institute</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Validity</td>
                <td>Till $oneMonth</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Taxes</td>
                <td>GST as per prevailing rates as notified by statutory authorities.</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Warranty and support</td>
                <td><b>Primary support plus extended support</b></td>
              </tr>
              <tr>
                <td>5</td>
                <td><b>License transfer</b></td>
                <td>Electronic( subjected to the realisation of 100% Payment, And receipt of License from SYNOPSYS, IRELAND )</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Subscription Period</td>
                <td>36 Months from the date of Shipment</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Delivery Period</td>
                <td>6-8 Weeks from realisation of funds & Signing of Synopsys End User License Agreement.</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Deliverables</td>
                <td>Software to be downloaded from Synopsys Web Site. Only soft copy of The Manuals will be provided. SAS deliverables include Dedicated on-site visits to conduct FDP and project guidance. Five days on-site visits over a period of 36 months.</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Payment</td>
                <td>100% Advance along with the P.O.</td>
              </tr>
              <tr>
                <td>10</td>
                <td>SAS</td>
                <td>SAS component is 20% of bundle cost which is included in the quote</td>
              </tr>

            </tbody>
        </table>
        <table class='quoted-table bank-detail-table'>
          <thead>
            <tr>
              <th colspan='3'>
                Our Bank Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Name of the Bank</td>
              <td>HDFC</td>
            </tr>
            <tr>
              <td>2</td>
              <td>IFSC CODE</td>
              <td>HDFC0001226</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Account Name</td>
              <td>Nanochip Solutions Pvt Ltd</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Account Type</td>
              <td>Current account</td>
            </tr>
            <tr>
              <td>5</td>
              <td>ACCOUNT NUMBER</td>
              <td>12262560001396</td>
            </tr>
            <tr>
              <td>6</td>
              <td>ADDRESS OF BANK</td>
              <td>103/31, 26TH Main, 4th T Block Jayanagar, Bangalore 560041</td>
            </tr>
            <tr>
              <td>7</td>
              <td>IN CASE OF DD ( Demand Draft )</td>
              <td>Nanochip Solutions Pvt Ltd. Payable in Bangalore</td>
            </tr>
          </tbody>
        </table>
      </section>


";

/* echo $table;
exit; */
$mpdf = new mPDF();
$mpdf->mPDF('utf-8', 'A4', '', '', '15', '15', '50', '18');

$result = $mpdf->SetHTMLHeader('  <header>
        <div><img src="nano_logo.png" class="header-logo"></div>
        <h6 class="org-name">Nanochip Solutions Pvt. Ltd.</h6>
        <p>HAMSA, 32/2, Ranga Rao Road, Shankarpuram, Bangalore -560004</p>
        <p>Phone: +91-98802 15781. Fax: +91-80-2661 1233</p>
        <p>Email: <a href="#">info@nanochipsolutions.com</a>&nbsp;&nbsp; Web: <a href="#">www.nanochipsolutions.com</a></p>
        <p class="cin-number">CIN: U72900KA2011PTC057821</p>
      </header>

');
$result = $mpdf->SetHTMLFooter('  <footer>
        <table>
          <tr>
            <td width="20%" valign="middle"><img src="nano_logo.png" class="footer-stamp-logo"></td>
            <td width="80%">
              <p><img src="nano_logo.png" class="header-logo"></p>
              <p>A.S.Varun Gaikwad , Regional Manager</p>
              <p>NanoChip Solutions Pvt Ltd ,BangaloreMobile : 91-98802 15781</p>
              <p>Email:<a href="">varun@nanochipsolutions.com</a> Web : <a href="">www.nanochipsolutions.com</a></p>
            </td>
          </tr>
        </table>
      </footer>
');

$filename = rand(000000,999999);
$stylesheet = file_get_contents('pdf.css'); // external css

$mpdf->WriteHTML($stylesheet, 1);
$mpdf->WriteHTML($table, 2);

$mpdf->Output('/var/www/html/sasnew/pdf/' . $filename . '.pdf', 'F');



$labpdf = "<div class='main-wrapper'>
   
        
      <h5 style='text-decoration: underline;margin: 15px 0;text-align: center;font-size: 16px'>System configuration & MAC ID details.</h5>
      <p style='font-size: 14px;margin-bottom: 5px;'><b>Quotation No:</b> NCSPL/ 2017-18 /PESIT-BLR /ECE/VLSI/KA/54 dtd 04.01.2018</p>
      <p style='font-size: 11px;'><b>Kindly provide the following details for the request of License Synopsys University Bundle FE/ BE, TCAD Tools/SABER-RD Bundle</b></p>
      <table class='quotation-table'>
        <tr>
          <td>
            institute Name
          </td>
          <td>
            <div class='border-cell height-2'>
              <b>PESIT-Bangalore South Campus, Bangalore</b>
            </div>
          </td>          
        </tr>
        <tr>
          <td colspan='2'><h4 style='font-size: 15px;text-decoration: underline;color: #11b050;margin-bottom:10px;'>Required Details:</h4></td>
        </tr>
        <tr>
          <td>
            Server Os &  Version 
          </td>
          <td>
            <div class='border-cell height-4'>
              &nbsp;
            </div>
            <p class='note'>* Enter your server OS/Linux name and version</p>
          </td>          
        </tr>
        <tr>
          <td>
            Ram / Hard disc 
          </td>
          <td>
            <div class='border-cell height-5'>
              <span class='field'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RAM :  _____________________  GB</span>
              <span class='field'>Hard disk :  _____________________  TB </span>
            </div>            
          </td>          
        </tr>
        <tr>
          <td>
            Server MAC ID/Host ID (12 Digits)<br>
            <span class='align-right'> In alphanumeric</span>
          </td>
          <td>
            <div class='border-cell height-4'>
              
            </div>
            
          </td>          
        </tr>
        <tr>
          <td>            
            <span class='align-right'>In Words (write numbers in words)</span>
          </td>
          <td>
            <div class='border-cell height-4'>
              
            </div>
             <p class='note'>* Enter MAC/Host ID address of the machine for license</p>
          </td>          
        </tr>
        <tr>
          <td colspan='2' style='padding: 0 ;'>Server/Client: <span class='text-normal'>Those machines that manage the license for Synopsys are Servers.</span></td>
        </tr>
        <tr>
          <td colspan='2'><div class='img-responsive server-img'><img src=''></div></td>
        </tr>
      </table>
      <p class='note'>Note: You are requested to give the details of server system /<b> Operating system must be REGISTERED for support.</b></p>
      <table class='server-system'>
        <tr>
          <td>Authorized person Name</td>
          <td>&nbsp;</td>
        </tr>
         <tr>
          <td>Designation</td>
          <td>&nbsp;</td>
        </tr>
         <tr>
          <td>Address</td>
          <td>&nbsp;</td>
        </tr>
         <tr>
          <td>Email ID (Official)<span class='red-color'>( For license file )</span></td>
          <td>&nbsp;</td>
        </tr>
      </table>
      <div class='signature-block'>
        <p><b>Authorized Signatory</b><br>(With Seal & Signature)</p>
      </div>
      <p class='note'>Operating system and RAM requirement for Synopsys University Bundle Server Machine.</p>
      <table class='eda-tools-table' style='margin-top: 10px'>
        <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys EDA tools</b></td></tr>
        <tr>
          <td style='padding:30px 0;''><i>OS/Platform</i></td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><i>RAM</i></td>
          <td>&nbsp;</td>
        </tr>        
      </table>
      <h4 style='font-size: 15px;text-decoration: underline;color: #11b050;margin:20px 0;'>Client Machine</h4>
      <table class='cleint-machine'>
        <tr>
          <td>1</td>
          <td>
            <table class='eda-tools-table cleint-machine-inner'>
              <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys Front End / Back End / Full Custom University Bundle</b></td></tr>
              <tr>
                <td style='padding:30px 10px;''><i>OS/Platform</i></td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><i>RAM</i></td>
                <td>&nbsp;</td>
              </tr>  
              <tr>
                <td><i>Hard disk</i></td>
                <td>&nbsp;</td>
              </tr>      
            </table>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <table class='eda-tools-table cleint-machine-inner'>
              <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys Saber RD University Bundle</b></td></tr>
              <tr>
                <td style='padding:30px 10px;''><i>OS/Platform</i></td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><i>RAM</i></td>
                <td>&nbsp;</td>
              </tr>  
              <tr>
                <td><i>Hard disk</i></td>
                <td>&nbsp;</td>
              </tr>      
            </table>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <table class='eda-tools-table cleint-machine-inner'>
              <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys System University Bundle</b></td></tr>
              <tr>
                <td style='padding:30px 10px;''><i>OS/Platform</i></td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><i>RAM</i></td>
                <td>&nbsp;</td>
              </tr>  
              <tr>
                <td><i>Hard disk</i></td>
                <td>&nbsp;</td>
              </tr>      
            </table>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <table class='eda-tools-table cleint-machine-inner'>
              <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys SBG University Bundle</b></td></tr>
              <tr>
                <td style='padding:30px 10px;''><i>OS/Platform</i></td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><i>RAM</i></td>
                <td>&nbsp;</td>
              </tr>  
              <tr>
                <td><i>Hard disk</i></td>
                <td>&nbsp;</td>
              </tr>      
            </table>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <table class='eda-tools-table cleint-machine-inner'>
              <tr><td style='padding:4px;text-align: left' colspan='2'><b>Synopsys TCAD UniversityBundle</b></td></tr>
              <tr>
                <td style='padding:30px 10px;''><i>OS/Platform</i></td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><i>RAM</i></td>
                <td>&nbsp;</td>
              </tr>  
              <tr>
                <td><i>Hard disk</i></td>
                <td>&nbsp;</td>
              </tr>      
            </table>
          </td>
        </tr>
      </table>
    </div> ";
    $mpdf = new mPDF();
$mpdf->mPDF('utf-8', 'A4', '', '', '15', '15', '50', '18');

$result = $mpdf->SetHTMLHeader('  <header>
        <div><img src="nano_logo.png" class="header-logo"></div>
        <h6 class="org-name">Nanochip Solutions Pvt. Ltd.</h6>
        <p>HAMSA, 32/2, Ranga Rao Road, Shankarpuram, Bangalore -560004</p>
        <p>Phone: +91-98802 15781. Fax: +91-80-2661 1233</p>
        <p>Email: <a href="#">info@nanochipsolutions.com</a>&nbsp&nbsp Web: <a href="#">www.nanochipsolutions.com</a></p>
        <p class="cin-number">CIN: U72900KA2011PTC057821</p>
      </header>


');
$result = $mpdf->SetHTMLFooter('  <footer>
        <table>
          <tr>
            <td width="20%" valign="middle"><img src="nano_logo.png" class="footer-stamp-logo"></td>
            <td width="80%">
              <p><img src="nano_logo.png" class="header-logo"></p>
              <p>A.S.Varun Gaikwad , Regional Manager</p>
              <p>NanoChip Solutions Pvt Ltd ,BangaloreMobile : 91-98802 15781</p>
              <p>Email:<a href="">varun@nanochipsolutions.com</a> Web : <a href="">www.nanochipsolutions.com</a></p>
            </td>
          </tr>
        </table>
      </footer>
');

$filename = rand(000000,999999);
$stylesheet1 = file_get_contents('lab.css'); // external css

$mpdf->WriteHTML($stylesheet1, 1);
$mpdf->WriteHTML($labpdf, 2);
echo $labpdf;
exit;
$mpdf->Output('/var/www/html/sasnew/pdf/' . $filename . '.pdf', 'F');

//echo $table;
?>


?>
