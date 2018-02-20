package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.control.View;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class AccountsView implements View {
    @Override
    @RequestMapping(value="/awesomeness")
    public String getAll() {
        return "I am not a jerk, LOL I guess I am";
    }
}
