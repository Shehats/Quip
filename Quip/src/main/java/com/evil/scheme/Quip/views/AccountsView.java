package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.control.AccountService;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "accounts")
public class AccountsView {
    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Account> getAll() {
        return this.accountService.findAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Account add(@ModelAttribute Account account) {
        return this.accountService.create(account);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Account getById(@PathVariable Long id) {
        return this.accountService.findById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Account update(@ModelAttribute Account account) {
        try {
            return this.accountService.update(account);
        } catch (AccountNotFoundException e) {
            return null;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable Long id) {
        try {
            return this.accountService.delete(id);
        } catch (AccountNotFoundException e) {
            return false;
        }
    }
}
