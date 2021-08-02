package com.aleiye.adatav.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/10/23.
 * Description:
 * Modified By:
 */
@Controller
@RequestMapping
public class ViewController {

    @GetMapping("/datav/edit/{id}")
    public String datavEdit(@PathVariable("id") String id, Model model){
        model.addAttribute("id",id);
        return "datav/edit";
    }
    @GetMapping("/datav/view/{id}")
    public String datavView(@PathVariable("id") String id, Model model){
        model.addAttribute("id",id);
        return "datav/view";
    }
    @GetMapping("/datav/list")
    public String datavList(@RequestHeader(value = "user-id",defaultValue = "1") String userId, Model model){
        model.addAttribute("userId",userId);
        return "datav/list";
    }
}
