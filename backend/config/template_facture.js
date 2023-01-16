exports.template = (payment) => {
    const now = new Date()
    let tableau = ''
    payment.payment.mois.forEach(p => {
        tableau += `
        <tr class="item mt-3">
           <td>${`${p.getMonth() + 1}/ ${p.getFullYear()}`}</td>
           <td>${payment.app.cotisation} dh</td>
        </tr>`
    })
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 1000px;
             margin-top: 250px;
             margin-left:40px;
             height:900px;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 25px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .mt-3{
               margin-top: 70px !important;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .datefacture{
               margin-top:20px;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="datefacture">
                               Réalisé le: ${`${now.getDate()}/ ${now.getMonth() + 1}/ ${now.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Client: ${payment.app.proprietaire}
                            </td>
                            <td>
                               Numero appartement: ${payment.app.numero}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading mt-3">
                   <td>Mois payé :</td>
                   <td>Montant</td>
                </tr>
                ${tableau}
                <tr class="heading mt-3">
                   <td>Total :</td>
                   <td>${payment.app.cotisation * payment.payment.mois.length} dh</td>
                </tr>
             </table>
             <br />
             
          </div>
       </body>
    </html>
    `;
};