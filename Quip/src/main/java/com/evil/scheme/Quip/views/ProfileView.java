package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.repositories.AccountRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "profile")
public class ProfileView {
    @Resource
    AccountRepository accountRepository;

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public Profile getProfile(@PathVariable String username) {
        Account account = this.accountRepository.findByUsername(username);
        return account.getProfile();
    }

}
