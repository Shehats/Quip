package com.evil.scheme.Quip.services;

import com.evil.scheme.Quip.control.PostService;
import com.evil.scheme.Quip.entities.posts.Post;

import java.util.List;
import java.util.stream.Stream;

public class PostServiceImpl implements PostService {
    @Override
    public Post create(Post obj) {
        return null;
    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    @Override
    public Stream<Post> streamAll() {
        return null;
    }

    @Override
    public List<Post> findAll() {
        return null;
    }

    @Override
    public Post update(Post obj) {
        return null;
    }

    @Override
    public Post findById(Long id) {
        return null;
    }
}
