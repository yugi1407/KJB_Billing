export const getHtmlContent = (date, username, selectedProducts, subtotal, discount, gstPercent, gstAmount, finalAmount) => {
  let html = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 10px 20px;
          font-size: 14px;
          color: #333;
        }
        h1, h2, h3, p {
          margin: 4px 0;
        }
        h1 {
          text-align: center;
          font-size: 20px;
        }
        h2 {
          font-size: 16px;
          text-align: right;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        th, td {
          padding: 6px 8px;
          text-align: left;
        }
        th {
          border-bottom: 1px solid #999;
        }
        td {
          border-bottom: 1px dashed #ccc;
        }
        .text-right {
          text-align: right;
        }
        .totals {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        hr {
          border: 0;
          border-top: 1px dashed #999;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>KJB Cafe</h1>
      <p>Address: No 246, Ramapuram, Chennai</p>
      <p>Date: ${date}</p>
      <p>Staff: ${username}</p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
  `;

  selectedProducts.forEach(p => {
    html += `
      <tr>
        <td>${p.product_name}</td>
        <td>${p.count}</td>
        <td class="text-right">₹${(p.count * p.amount).toFixed(2)}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
      <div class="totals">
        <p class="text-right">Subtotal: ₹${subtotal.toFixed(2)}</p>
        <p class="text-right">Discount: -₹${discount.toFixed(2)}</p>
        <p class="text-right">GST (${gstPercent}%): +₹${gstAmount.toFixed(2)}</p>
        <hr/>
        <h2>Final Total: ₹${finalAmount.toFixed(2)}</h2>
      </div>
      <div class="footer">
        <p>Thank you for visiting KJB Cafe!</p>
      </div>
    </body>
    </html>
  `;

  return html;
};
