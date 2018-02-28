package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.comments.Comment;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.forms.CommentForm;
import com.evil.scheme.Quip.services.CommentServiceImpl;
import com.evil.scheme.Quip.services.PostServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "comments")
public class CommentView {
    @Resource
    CommentServiceImpl commentService;

    @Resource
    PostServiceImpl postService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Comment add(@ModelAttribute CommentForm comment) throws PostNotFoundException {
        Comment retVal = this.commentService.create(new Comment((comment.getDescription())));
        this.postService.update(this.postService.findById(comment.getParentId()));
        return retVal;
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Comment update(@ModelAttribute Comment comment) {
        try {
            return this.commentService.update(comment);
        } catch (CommentNotFoundException e) {
            return null;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable Long id) {
        try {
            return this.commentService.delete(id);
        } catch (CommentNotFoundException e) {
            return false;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Comment getById(@PathVariable Long id) {
        return this.commentService.findById(id);
    }

}
