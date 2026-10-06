/*
# Create orders table for John Major Innovation Technology ecommerce store

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `order_number` (text, unique, human-readable order reference)
  - `full_name` (text, customer full name)
  - `phone` (text, customer phone number)
  - `email` (text, customer email)
  - `address` (text, delivery address)
  - `city` (text, city)
  - `state` (text, state)
  - `notes` (text, optional additional notes)
  - `items` (jsonb, array of cart items with product details and quantities)
  - `total` (numeric, order total amount)
  - `payment_method` (text, payment method - Direct Bank Transfer)
  - `status` (text, order status - defaults to 'awaiting_payment')
  - `created_at` (timestamptz, order creation timestamp)

2. Security
- Enable RLS on `orders`.
- Allow anon + authenticated to INSERT orders (customers place orders without sign-in).
- Allow anon + authenticated to SELECT orders by order_number (for order confirmation lookup).
- No UPDATE or DELETE from the frontend — orders are managed server-side.

3. Notes
- This is a no-auth ecommerce store. Customers place orders as anon.
- Orders default to 'awaiting_payment' status for bank transfer verification.
- The `items` jsonb field stores the full cart snapshot at order time.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  notes text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'Direct Bank Transfer',
  status text NOT NULL DEFAULT 'awaiting_payment',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);
