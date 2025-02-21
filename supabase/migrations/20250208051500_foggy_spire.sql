/*
  # Initial Schema for KhataBook Clone

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `phone` (text)
      - `created_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, references customers)
      - `amount` (decimal)
      - `type` (text, either 'CREDIT' or 'DEBIT')
      - `description` (text)
      - `date` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create customers table
CREATE TABLE customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    name text NOT NULL,
    phone text,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9]{10,}$')
);

-- Create transactions table
CREATE TABLE transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid REFERENCES customers ON DELETE CASCADE NOT NULL,
    amount decimal NOT NULL,
    type text NOT NULL CHECK (type IN ('CREDIT', 'DEBIT')),
    description text,
    date timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for customers table
CREATE POLICY "Users can view their own customers"
    ON customers FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customers"
    ON customers FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers"
    ON customers FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers"
    ON customers FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for transactions table
CREATE POLICY "Users can view their customers' transactions"
    ON transactions FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM customers
        WHERE customers.id = transactions.customer_id
        AND customers.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert transactions for their customers"
    ON transactions FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM customers
        WHERE customers.id = transactions.customer_id
        AND customers.user_id = auth.uid()
    ));

CREATE POLICY "Users can update their customers' transactions"
    ON transactions FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM customers
        WHERE customers.id = transactions.customer_id
        AND customers.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete their customers' transactions"
    ON transactions FOR DELETE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM customers
        WHERE customers.id = transactions.customer_id
        AND customers.user_id = auth.uid()
    ));