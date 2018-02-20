package com.evil.scheme.Quip.control;

import com.evil.scheme.Quip.entities.accounts.Account;

import java.util.List;
import java.util.stream.Stream;

public interface AccountService {
    Account create(Account obj);
    boolean delete(Long id);
    Stream<Account> streamAll();
    List<Account> findAll();
    Account update(Account obj);
    Account findById(Long id);
}
