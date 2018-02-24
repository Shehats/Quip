package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.control.View;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "accounts")
public class AccountsView {
    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('TRUSTED_USER')")
    public List<Account> getAll() {
        return this.accountService.findAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('TRUSTED_USER')")
    public Account add(@ModelAttribute Account account) {
        return this.accountService.create(account);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority('TRUSTED_USER')")
    public Account getById(@PathVariable Long id) {
        return this.accountService.findById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @PreAuthorize("hasAuthority('TRUSTED_USER')")
    public Account update(@ModelAttribute Account account) {
        try {
            return this.accountService.update(account);
        } catch (AccountNotFountException e) {
            return null;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('TRUSTED_USER')")
    public boolean delete(@PathVariable Long id) {
        try {
            return this.accountService.delete(id);
        } catch (AccountNotFountException e) {
            return false;
        }
    }
}
