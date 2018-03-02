package com.evil.scheme.Quip.repositories;

import com.evil.scheme.Quip.entities.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	
}
