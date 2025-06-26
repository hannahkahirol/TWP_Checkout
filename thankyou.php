<?php
include 'config.php';

$order_id = $_GET['order_id'];
if (!$order_id) {
    echo "Invalid order.";
    exit;
}

// Fetch order
$order = $conn->query("SELECT * FROM orders WHERE order_ID = $order_id")->fetch_assoc();
$items = $conn->query("SELECT * FROM order_items WHERE order_ID = $order_id");

echo "<h1>Thank You for Your Order!</h1>";
echo "<p>Order ID: {$order['order_ID']}</p>";
echo "<p>Status: {$order['order_status']}</p>";
echo "<p>Total Paid: RM {$order['total_amount']}</p>";

echo "<h2>Items:</h2><ul>";
while ($item = $items->fetch_assoc()) {
  echo "<li>Product ID: {$item['product_ID']} | Quantity: {$item['quantity']} | Price: RM {$item['unit_price']}</li>";
}
echo "</ul>";
?>
