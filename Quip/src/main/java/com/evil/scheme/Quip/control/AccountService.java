package com.evil.scheme.Quip.control;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.exceptions.AccountNotFountException;

import java.util.List;
import java.util.stream.Stream;

public interface AccountService {
    Account create(Account obj);
    boolean delete(Long id) throws AccountNotFountException;
    Stream<Account> streamAll();
    List<Account> findAll();
    Account update(Account obj) throws AccountNotFountException;
    Account findById(Long id);
}
