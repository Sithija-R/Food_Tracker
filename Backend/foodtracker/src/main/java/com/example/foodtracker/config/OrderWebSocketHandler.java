package com.example.foodtracker.config;

import com.example.foodtracker.model.Order;
import com.example.foodtracker.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

public class OrderWebSocketHandler extends TextWebSocketHandler {

    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    @Autowired
    private OrderService orderService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("New WebSocket connection: " + session.getId());

        String userEmail = (String) session.getAttributes().get("userEmail");
        if (userEmail != null) {

            Order order = orderService.getLatestOrderForUser(userEmail);
            if (order != null) {
                session.sendMessage(new TextMessage("Initial: Order " + order.getId() + " status is " + order.getStatus()));
            } else {
                session.sendMessage(new TextMessage("Initial: No active orders for " + userEmail));
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("Received message from " + session.getId() + ": " + payload);
        if (payload.startsWith("accept:")) {
            String orderIdStr = payload.split(":")[1];
            Long orderId = Long.parseLong(orderIdStr);
            Order updatedOrder = orderService.updateStatus(orderId, "ACCEPTED", null);
            broadcastOrderUpdate(updatedOrder);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket connection closed: " + session.getId());
    }

    public void broadcastOrderUpdate(Order order) throws IOException {
        String message = "Update: Order " + order.getId() + " status is " + order.getStatus();
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    System.err.println("Error broadcasting to " + session.getId() + ": " + e.getMessage());
                }
            }
        }
    }
}