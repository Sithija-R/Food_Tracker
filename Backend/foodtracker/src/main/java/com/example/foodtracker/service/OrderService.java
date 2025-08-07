package com.example.foodtracker.service;

import java.io.IOException;
import java.util.List;

import com.example.foodtracker.config.OrderWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodtracker.model.Order;
import com.example.foodtracker.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderWebSocketHandler webSocketHandler;

    public Order createOrder(Order order){
    
        if (order.getDescription() == null || order.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Order description cannot be empty");
        }
        if (order.getCustomerLocation() == null) {
            throw new IllegalArgumentException("Customer location cannot be null");
        }
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("NEW");
        }
        try {
            Order savedOrder = orderRepository.save(order);
            try {
                webSocketHandler.broadcastOrderUpdate(savedOrder);
            } catch (IOException e) {
                throw new RuntimeException("Failed to broadcast new order: " + e.getMessage());
            }
            return savedOrder;
        } catch (Exception e) {
            throw new RuntimeException("Order creation failed, Try again!");
        }

    }

    public List<Order> getAvailableOrders(){
        try {
            return orderRepository.findByStatus("NEW");
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch available orders, Try again!");
        }
    }

    public List<Order> getAllOrders(){
        try {
            return orderRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch available orders, Try again!");
        }
    }

    public Order updateStatus(Long orderId, String status, Long driverId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        if(driverId != null) {
            order.setDriverId(driverId);
        }
        try {
            Order updatedOrder = orderRepository.save(order);

            try {
                webSocketHandler.broadcastOrderUpdate(updatedOrder);
            } catch (IOException e) {
                throw new RuntimeException("Failed to broadcast order update: " + e.getMessage());
            }
            return updatedOrder;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update order status, Try again!");
        }
    }
    public Order getLatestOrderForUser(String userEmail) {

        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .filter(order -> userEmail.equals(order.getCustomerEmail()))
                .reduce((first, second) -> second)
                .orElse(null);

    }
    
}
