package com.evil.scheme.Quip.control;

import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;

import java.util.List;
import java.util.stream.Stream;

public interface PostService {
    Post create(Post obj);
    boolean delete(Long id) throws PostNotFoundException;
    Stream<Post> streamAll();
    List<Post> findAll();
    Post update(Post obj) throws PostNotFoundException;
    Post findById(Long id);
}
