/**
 * Automated HTML & PDF Invoice Generator
 */
exports.generateInvoiceHTML = (order, course) => {
  return `
    <html>
      <head><title>Invoice #${order.invoiceNumber}</title></head>
      <body style="font-family: Arial, sans-serif; padding: 40px;">
        <h2>EduZenith Enterprise LMS Invoice</h2>
        <p><strong>Invoice ID:</strong> ${order.invoiceNumber}</p>
        <p><strong>Billed To:</strong> ${order.studentName} (${order.studentEmail})</p>
        <p><strong>Course Title:</strong> ${course.title}</p>
        <p><strong>Total Amount:</strong> $${order.amount.toFixed(2)} USD</p>
        <p><strong>Status:</strong> PAID</p>
        <p><strong>Date:</strong> ${new Date(order.paidAt || Date.now()).toLocaleDateString()}</p>
      </body>
    </html>
  `;
};
