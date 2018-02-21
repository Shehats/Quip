package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.control.View;
import com.evil.scheme.Quip.entities.accounts.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/")
public class AccountsView {
    @Autowired
    private AccountService accountService;

    @GetMapping("/awesomeness")
    public List<Account> getAll() {
        return this.accountService.findAll();
    }
}
