package com.evil.scheme.Quip.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.evil.scheme.Quip.entities.comments.Comments;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Long>{
	
}
