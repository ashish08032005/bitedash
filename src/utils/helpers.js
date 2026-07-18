export const generateReceiptText = (order, userName, userEmail) => {
  const line = '--------------------------------------------------';
  const doubleLine = '==================================================';
  
  let itemsText = '';
  order.items.forEach(item => {
    const sizeStr = item.selectedSize ? ` (${item.selectedSize.name})` : '';
    const extrasStr = item.selectedExtras.length > 0 
      ? `\n   + Extras: ${item.selectedExtras.map(e => e.name).join(', ')}` 
      : '';
    
    itemsText += `${item.quantity}x ${item.dish.name}${sizeStr}${extrasStr}\n`;
    itemsText += `   Price: INR ${item.totalUnitPrice} | Total: INR ${item.totalUnitPrice * item.quantity}\n\n`;
  });

  return `
${doubleLine}
                 BITEDASH INVOICE                 
${doubleLine}
Order ID:     #${order.id}
Order Date:   ${new Date(order.date).toLocaleString('en-IN')}
Status:       ${order.status}
${line}
CUSTOMER DETAILS:
Name:         ${userName}
Email:        ${userEmail}
Address:      ${order.address}
${line}
ORDER ITEMS:
${line}
${itemsText}
${line}
BILLING DETAILS:
Subtotal:     INR ${order.subtotal}
Discount:     INR -${order.discount || 0}
Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : 'INR ' + order.deliveryFee}
GST Tax (5%): INR ${order.tax}
${line}
TOTAL PAID:   INR ${order.total}
${line}
Payment Mode: ${order.paymentMethod}
${doubleLine}
        Thank you for ordering with BiteDash!        
          For support, contact support@bitedash.com   
${doubleLine}
`;
};

export const downloadReceipt = (order, userName, userEmail) => {
  const text = generateReceiptText(order, userName, userEmail);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `BiteDash_Receipt_${order.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
