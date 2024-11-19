import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
`;

const OrdersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const OrderCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OrderHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OrderDetails = styled.div`
  font-size: 14px;
  color: #555;
`;

const ProductList = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: disc;
`;

const ProductItem = styled.li`
  font-size: 14px;
  color: #333;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("krist-app-token");
      const response = await axios.get("http://localhost:8000/api/user/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    );
  }

  return (
    <Container>
      <Title>Your Orders</Title>
      <OrdersWrapper>
        {orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderHeader>Order ID: {order._id}</OrderHeader>
            <OrderDetails>
              <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </OrderDetails>
            <div>
              <strong>Products:</strong>
              <ProductList>
                {order.products.map((product) => (
                  <ProductItem key={product.product._id}>
                    {product.product.name} - Quantity: {product.quantity}
                  </ProductItem>
                ))}
              </ProductList>
            </div>
          </OrderCard>
        ))}
      </OrdersWrapper>
    </Container>
  );
};

export default OrdersPage;
