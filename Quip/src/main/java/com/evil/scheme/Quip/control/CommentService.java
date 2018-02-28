package com.evil.scheme.Quip.control;

import java.util.List;
import java.util.stream.Stream;

import com.evil.scheme.Quip.entities.comments.Comment;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;

public interface CommentService {
    Comment create(Comment obj);
    boolean delete(Long id) throws CommentNotFoundException;
    Stream<Comment> streamAll();
    List<Comment> findAll();
    Comment update(Comment obj) throws CommentNotFoundException;
    Comment findById(Long id);
}
