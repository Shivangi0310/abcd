package com.ttn.reap.controller;

import com.ttn.reap.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/reap")
public class ItemController {

    @Autowired
    ItemService itemService;

//    @RequestMapping("/items")
//    public String fetchItems(Model model, HttpSession session) {
//        model.addAttribute("loggedInUser", session.getAttribute("loggedInUser"));
//        return "Item";
//    }
    @GetMapping("/items")
    public String showAll(Model model,HttpSession session) {
        model.addAttribute("loggedInUser", session.getAttribute("loggedInUser"));
        model.addAttribute("items",itemService.findAll());
        return "Item";
    }

}
