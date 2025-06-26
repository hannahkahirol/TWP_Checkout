<?php
include 'config.php'; // Connect to DB

$cart = json_decode($_POST['cartData'], true); // Get cart from hidden field
if (!$cart || count($cart) === 0) {
    die("No items in cart.");
}

// 💳 Get form inputs (use safer validation in real-world)
$email = $_POST['email'];
$payment_method = $_POST['payment_method'] ?? 'credit';
$payment_status = 'Paid'; // Assuming always paid
$shipping_line1 = $_POST['address_line1'];
$shipping_line2 = $_POST['address_line2'] ?? '';
$shipping_postcode = $_POST['postcode'];
$shipping_city = $_POST['city'];
$shipping_town = $_POST['state'];
$shipping_method = "Standard";
$shipping_cost = 0.00;
$tax = 0.00;
$discount = 0.00;
$notes = '';
$subtotal = 0.00;

// 🧮 Calculate subtotal
foreach ($cart as $item) {
    $subtotal += $item['price'] * $item['quantity'];
}
$total_amount = $subtotal + $tax - $discount;

// 🧍 If you don't have users table yet, set a fake user ID
$user_ID = 1;
$order_status = "Pending";

// ✅ INSERT INTO orders
$sql = "INSERT INTO orders (
    user_ID, order_status, payment_method, payment_status,
    shipping_address_line1, shipping_address_line2, shipping_postcode,
    shipping_city, shipping_town, shipping_method, shipping_cost,
    subtotal, tax, discount, total_amount, notes
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("isssssssssddddds",
    $user_ID, $order_status, $payment_method, $payment_status,
    $shipping_line1, $shipping_line2, $shipping_postcode,
    $shipping_city, $shipping_town, $shipping_method, $shipping_cost,
    $subtotal, $tax, $discount, $total_amount, $notes
);

if (!$stmt->execute()) {
    die("Error saving order: " . $stmt->error);
}

$order_ID = $stmt->insert_id;
$stmt->close();

// ✅ INSERT INTO order_items
$item_sql = "INSERT INTO order_items (order_ID, product_ID, variant_ID, quantity, unit_price, subtotal)
             VALUES (?, ?, ?, ?, ?, ?)";
$item_stmt = $conn->prepare($item_sql);

foreach ($cart as $item) {
    $product_ID = 1; // Placeholder, unless you have product IDs
    $variant_ID = null;
    $quantity = $item['quantity'];
    $unit_price = $item['price'];
    $item_subtotal = $quantity * $unit_price;

    $item_stmt->bind_param("iiiddi", $order_ID, $product_ID, $variant_ID, $quantity, $unit_price, $item_subtotal);
    $item_stmt->execute();
}
$item_stmt->close();
$conn->close();

// ✅ Clear cart from browser & redirect
echo "<script>
  localStorage.removeItem('tfhCart');
  window.location.href = 'thankyou.php?order_id=$order_ID';
</script>";
?>
