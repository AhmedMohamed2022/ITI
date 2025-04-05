const client = new proto.Order.OrderClient(
    'http://localhost:5000', // Your API URL
    null,
    null
);

function placeOrder() {
    const request = new proto.PlaceOrderRequest();
    request.setClientId(parseInt(document.getElementById('clientId').value));

    const product = new proto.OrderItem();
    product.setProductId(parseInt(document.getElementById('productId').value));
    product.setQuantity(parseInt(document.getElementById('quantity').value));

    request.setProductsList([product]);

    client.placeOrder(request, {}, (err, response) => {
        const resultDiv = document.getElementById('result');
        if (err) {
            resultDiv.innerHTML = `Error: ${err.message}`;
        } else {
            resultDiv.innerHTML = `Order ${response.getMessage()} (ID: ${response.getOrderId()})`;
        }
    });
}