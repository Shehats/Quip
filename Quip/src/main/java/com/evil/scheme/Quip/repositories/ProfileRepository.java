package com.evil.scheme.Quip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.evil.scheme.Quip.entities.profiles.Profile;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>{
    @Query("select p from Profile p where p.account.username = :username")
    Profile findByUser(@Param("username") String username);
}
