package com.example.foodtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodtracker.model.Order;
import com.example.foodtracker.repository.OrderRepository;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

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
            return orderRepository.save(order);
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
            return orderRepository.save(order);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update order status, Try again!");
        }
    }
    
}
