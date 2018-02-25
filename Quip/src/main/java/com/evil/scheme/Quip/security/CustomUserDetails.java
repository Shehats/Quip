package com.evil.scheme.Quip.security;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetails implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        if (account == null)
            throw new UsernameNotFoundException("User not found");

        System.out.println(account.getUsername());
        System.out.println("dfhjbhbghbhbjbjbjbnbnbnbn");
        System.out.println(account.getPassword());

        return User.withUsername(username)
                    .password(account.getPassword())
                    .authorities(account.getRoles())
                    .accountExpired(false)
                    .accountLocked(false)
                    .credentialsExpired(false)
                    .disabled(false).build();
    }
}
