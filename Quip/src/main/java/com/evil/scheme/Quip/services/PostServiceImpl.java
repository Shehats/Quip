package com.evil.scheme.Quip.services;

import com.evil.scheme.Quip.control.PostService;
import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.repositories.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Stream;

@Service
public class PostServiceImpl implements PostService {
    @Resource
    private PostRepository repository;

    @Override
    @Transactional
    public Post create(Post obj) {
        return this.repository.save(obj);
    }

    @Override
    @Transactional(rollbackFor = PostNotFoundException.class)
    public boolean delete(Long id) throws PostNotFoundException {
        Post post = this.repository.findOne(id);
        if (post == null)
            throw new PostNotFoundException("Account not found.");
        this.repository.delete(post);
        return true;
    }

    @Override
    public Stream<Post> streamAll() {
        return this.repository.findAll().stream();
    }

    @Override
    public List<Post> findAll() {
        return this.repository.findAll();
    }

    @Override
    @Transactional(rollbackFor = PostNotFoundException.class)
    public Post update(Post obj) throws PostNotFoundException{
        Post post = this.repository.findOne(obj.getId());
        if (post == null)
            throw new PostNotFoundException("Post not found.");
        post.setTitle(obj.getTitle());
        post.setDescription(obj.getDescription());
        post.setMediaUrl(obj.getMediaUrl());
        post.setDislikes(obj.getDislikes());
        post.setLikes(obj.getLikes());
        post.setComments(obj.getComments());
        post.getComments().forEach(x -> {
            System.out.println(x.getDescription());
        });
        return post;
    }

    @Override
    public Post findById(Long id) {
        return this.repository.findOne(id);
    }
}
