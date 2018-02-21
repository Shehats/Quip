package com.evil.scheme.Quip.services;

import com.evil.scheme.Quip.control.AccountService;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.repositories.AccountRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Stream;

@Service
public class AccountServiceImpl implements AccountService{
    @Resource
    private AccountRepository repository;

    @Override
    public Account create(Account obj) {
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Stream<Account> streamAll() {
        return null;
    }

    @Override
    public List<Account> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Account update(Account obj) {
        return null;
    }

    @Override
    public Account findById(Long id) {
        return null;
    }
}
