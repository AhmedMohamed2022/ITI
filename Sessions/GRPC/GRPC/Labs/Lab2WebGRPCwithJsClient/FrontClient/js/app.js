// Initialize gRPC-Web Client
const client = new proto.OrderClient(
  "http://localhost:5000", // Your API URL
  null,
  null
);

document.getElementById("orderBtn").addEventListener("click", () => {
  const request = new proto.PlaceOrderRequest();
  request.setClientId(parseInt(document.getElementById("clientId").value));

  const product = new proto.OrderItem();
  product.setProductId(parseInt(document.getElementById("productId").value));
  product.setQuantity(parseInt(document.getElementById("quantity").value));

  request.setProductsList([product]);

  client.placeOrder(request, {}, (err, response) => {
    const resultDiv = document.getElementById("result");
    if (err) {
      resultDiv.innerHTML = `Error: ${err.message}`;
    } else {
      resultDiv.innerHTML = `
                <p>Status: ${response.getMessage()}</p>
                <p>Order ID: ${response.getOrderId()}</p>
            `;
    }
  });
});
