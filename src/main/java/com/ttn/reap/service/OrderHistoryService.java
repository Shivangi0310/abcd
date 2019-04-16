package com.ttn.reap.service;

import com.ttn.reap.entity.Employee;
import com.ttn.reap.entity.OrderHistory;
import com.ttn.reap.repository.OrderHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class OrderHistoryService {
    @Autowired
    private OrderHistoryRepository orderRepository;

    
}