package com.evil.scheme.Quip.repositories;

import com.evil.scheme.Quip.entities.accounts.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("select count(a) > 0 from Account a where a.email = :username or a.username = :username")
    boolean exists(@Param("username") String username);
}
