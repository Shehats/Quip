package com.evil.scheme.Quip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.evil.scheme.Quip.entities.profiles.Profile;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long>{
//	@Query("select a from Account a where a.username = :username")
}
