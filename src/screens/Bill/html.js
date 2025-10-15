export const getHtmlContent = (date, username, selectedProducts, subtotal, discount, gstPercent, gstAmount, finalAmount) => {
    let html = `
      <html>
      <head>
      <style>
        body { font-family: Arial; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 8px; border-bottom: 1px solid #ccc; text-align: left; }
        h1 { margin-bottom: 5px; }
      </style>
      </head>
      <body>
        <h1>KJB Cafe</h1>
        <p>Address: No 246, Ramapuram, Chennai</p>
        <p>Date: ${date}</p>
        <p>Staff: ${username}</p>
        <table>
          <tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
    `;
    selectedProducts.forEach(p => {
      html += `<tr><td>${p.product_name}</td><td>${p.count}</td><td>${p.count * p.amount}</td></tr>`;
    });
    html += `
        </table>
        <h3 style="text-align:right; margin-top:10px;">Subtotal: ₹${subtotal.toFixed(2)}</h3>
        <h3 style="text-align:right;">Discount: -₹${discount.toFixed(2)}</h3>
        <h3 style="text-align:right;">GST (${gstPercent}%): +₹${gstAmount.toFixed(2)}</h3>
        <hr/>
        <h2 style="text-align:right;">Final Total: ₹${finalAmount.toFixed(2)}</h2>
        <p>Thank you for visiting KJB Cafe!</p>
      </body></html>
    `;
    return html;
  };