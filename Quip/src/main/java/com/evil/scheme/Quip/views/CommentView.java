package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.comments.Comment;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;
import com.evil.scheme.Quip.services.CommentServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "comments")
public class CommentView {
    @Resource
    CommentServiceImpl commentService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Comment add(@ModelAttribute Comment comment) {
        return this.commentService.create(comment);
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
