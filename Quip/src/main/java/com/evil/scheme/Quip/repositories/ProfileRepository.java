package com.evil.scheme.Quip.repositories;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import java.util.*;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>{
    @Query("select p from Profile p where p.account.username = :username")
    Profile findByUser(@Param("username") String username);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("update Profile p set p.description = :description, p.posts = :posts, p.friends = :friends where p.profileId = :profileId")
    int updateProfile(@Param("profileId") Long profileId, @Param("description") String description, 
    				  @Param("posts") List<Post> posts,  @Param("friends") List<Account> friends);
}
