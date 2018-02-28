package com.evil.scheme.Quip.control;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFoundException;

import java.util.List;
import java.util.stream.Stream;

public interface AccountService {
    Account create(Account obj);
    boolean delete(Long id) throws AccountNotFoundException;
    Stream<Account> streamAll();
    List<Account> findAll();
    Account update(Account obj) throws AccountNotFoundException;
    Account findById(Long id);
}
