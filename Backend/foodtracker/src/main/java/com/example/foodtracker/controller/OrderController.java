package com.example.foodtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodtracker.model.Order;
import com.example.foodtracker.model.User;
import com.example.foodtracker.service.OrderService;
import com.example.foodtracker.service.UserPrincipal;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Order order, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        try {
            User user = userPrincipal.getUser();
            order.setCustomerEmail(user.getEmail());
            Order createdOrder = orderService.createOrder(order);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

     @GetMapping("/available")
        public ResponseEntity<?> getAvailable() {
            try {
                List<Order> orders = orderService.getAvailableOrders();
                return new ResponseEntity<>(orders, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

        @GetMapping("/all")
        public ResponseEntity<?> getAll() {
            try {
                List<Order> orders = orderService.getAllOrders();
                return new ResponseEntity<>(orders, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

        @PostMapping("/{orderId}/accept")
        public ResponseEntity<?> acceptOrder(@PathVariable Long orderId,@AuthenticationPrincipal UserPrincipal userPrincipal) {
            try {
                User driver = userPrincipal.getUser();
                Order updatedOrder = orderService.updateStatus(orderId, "ACCEPTED", driver.getId());
                return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

        @PostMapping("/{orderId}/complete")
        public ResponseEntity<?> completeOrder(@PathVariable Long orderId, @AuthenticationPrincipal UserPrincipal userPrincipal) {
            try {
                User driver = userPrincipal.getUser();
                Order updatedOrder = orderService.updateStatus(orderId, "DELIVERED", driver.getId());
                return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
}
