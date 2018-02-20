package com.evil.scheme.Quip.control;

import com.evil.scheme.Quip.entities.posts.Post;

import java.util.List;
import java.util.stream.Stream;

public interface PostService {
    Post create(Post obj);
    boolean delete(Long id);
    Stream<Post> streamAll();
    List<Post> findAll();
    Post update(Post obj);
    Post findById(Long id);
}
