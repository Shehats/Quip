package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.services.PostServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "posts")
public class PostView {
    @Resource
    PostServiceImpl postService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Post add(@ModelAttribute Post post) {
        return this.postService.create(post);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Post update(@ModelAttribute Post post) {
        try {
            return this.postService.update(post);
        } catch (PostNotFoundException e) {
            return null;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable Long id) {
        try {
            return this.postService.delete(id);
        } catch (PostNotFoundException e) {
            return false;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Post getById(@PathVariable Long id) {
        return this.postService.findById(id);
    }
}
