package com.evil.scheme.Quip.repositories;

import com.evil.scheme.Quip.entities.accounts.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    @Query("select case when count(a) > 0 then true else false end from Account a where a.username = :username or a.email = :username")
    boolean exists(@Param("username") String username);

    @Query("select a from Account a where a.username = :username")
    Account findByUsername(@Param("username") String username);

    @Query("select a from Account a where a.email = :email")
    Account findByEmail(@Param("email") String email);

    @Query("select a from Account a where a.username = :username or a.email = :username")
    Account findByEmailOrUsername(@Param("username") String username);

    @Query("select a from Account a where a.email like concat(:email,'%')")
    Account findWithPartOfEmail(@Param("email") String email);
}
