package com.evil.scheme.Quip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.evil.scheme.Quip.entities.comments.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
//	@Query("select a from Account a where a.username = :username")
}
