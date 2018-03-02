package com.evil.scheme.Quip.services;

import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;
import com.evil.scheme.Quip.repositories.AccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AccountServiceImpl implements AccountService{
    @Resource
    private AccountRepository repository;

    @Override
    @Transactional
    public Account create(Account obj) {
        return this.repository.save(obj);
    }

    @Override
    @Transactional(rollbackFor = AccountNotFoundException.class)
    public boolean delete(Long id) throws AccountNotFoundException {
        Account account = this.repository.findOne(id);
        if (account == null)
            throw new AccountNotFoundException("Account not found.");
        this.repository.delete(account);
        return true;
    }

    @Override
    public Stream<Account> streamAll() {
        return this.repository.findAll().stream();
    }

    @Override
    public List<Account> findAll() {
        return this.repository.findAll();
    }

    @Override
    @Transactional(rollbackFor = AccountNotFoundException.class)
    public Account update(Account obj) throws AccountNotFoundException {
        Account account = this.repository.findOne(obj.getId());
        if (account == null)
            throw new AccountNotFoundException("Account not found.");
        account.setUsername(obj.getUsername());
        account.setEmail(obj.getEmail());
        account.setFname(obj.getFname());
        account.setPassword(obj.getPassword());
        account.setLname(obj.getLname());
        account.setProfilePic(obj.getProfilePic());
        return this.create(obj);
    }

    @Override
    public Account findById(Long id) {
        return this.repository.findOne(id);
    }
}
