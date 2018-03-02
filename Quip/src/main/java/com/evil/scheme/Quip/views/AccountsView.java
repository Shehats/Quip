package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.control.AccountService;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;
import com.evil.scheme.Quip.forms.PasswordForm;
import com.evil.scheme.Quip.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

import static com.evil.scheme.Quip.views.ProfileView.refactorToken;

@RestController
@RequestMapping(value = "accounts")
public class AccountsView {
    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Resource
    private AccountRepository accountRepository;

    @Resource
    private BCryptPasswordEncoder passwordEncoder;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Account> getAll() {
        return this.accountService.findAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Account add(@RequestBody Account account) {
        return this.accountService.create(account);
    }

    @RequestMapping(value = "/forget-password", method = RequestMethod.POST)
    public Account updatePassword(@RequestBody PasswordForm passwordForm) throws AccountNotFoundException{
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(passwordForm.getToken())));
        if (account != null) {
            this.accountRepository.updatePassword(account.getId(),this.passwordEncoder.encode(passwordForm.getPassword()));
            return account;
        }
        else {
            throw new AccountNotFoundException("Account not found");
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Account getById(@PathVariable Long id) {
        return this.accountService.findById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Account update(@RequestBody Account account) {
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
