<?php
include 'config.php';

$cart = json_decode($_POST['cartData'], true);

// Replace these with real form values later
$user_ID = 1;
$order_status = "Pending";
$payment_method = "Credit Card";
$payment_status = "Paid";
$shipping_line1 = "123 Main St";
$shipping_line2 = "Apt 1A";
$shipping_postcode = "88000";
$shipping_city = "Kota Kinabalu";
$shipping_town = "Sabah";
$shipping_method = "Standard";
$shipping_cost = 0.00;
$subtotal = 0.00;
$tax = 0.00;
$discount = 0.00;
$notes = null;

// Calculate subtotal and total
foreach ($cart as $item) {
  $subtotal += $item['price'] * $item['quantity'];
}
$total_amount = $subtotal + $tax - $discount;

// Insert into orders
$order_sql = "INSERT INTO orders (
  user_ID, order_status, payment_method, payment_status,
  shipping_address_line1, shipping_address_line2, shipping_postcode,
  shipping_city, shipping_town, shipping_method, shipping_cost,
  subtotal, tax, discount, total_amount, notes
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($order_sql);
$stmt->bind_param("isssssssssddddds",
  $user_ID, $order_status, $payment_method, $payment_status,
  $shipping_line1, $shipping_line2, $shipping_postcode,
  $shipping_city, $shipping_town, $shipping_method, $shipping_cost,
  $subtotal, $tax, $discount, $total_amount, $notes
);
$stmt->execute();
$order_ID = $stmt->insert_id;
$stmt->close();

// Insert items
$item_sql = "INSERT INTO order_items (order_ID, product_ID, variant_ID, quantity, unit_price, subtotal)
             VALUES (?, ?, ?, ?, ?, ?)";
$item_stmt = $conn->prepare($item_sql);

foreach ($cart as $item) {
  $product_ID = 1; // Replace with real ID
  $variant_ID = null;
  $quantity = $item['quantity'];
  $unit_price = $item['price'];
  $item_subtotal = $quantity * $unit_price;

  $item_stmt->bind_param("iiiddi", $order_ID, $product_ID, $variant_ID, $quantity, $unit_price, $item_subtotal);
  $item_stmt->execute();
}
$item_stmt->close();
$conn->close();

header("Location: thankyou.php?order_id=" . $order_ID);
exit;
?>
