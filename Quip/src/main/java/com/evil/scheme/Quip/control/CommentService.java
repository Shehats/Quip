package com.evil.scheme.Quip.control;

import java.util.List;
import java.util.stream.Stream;

import com.evil.scheme.Quip.entities.comments.Comments;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;

public interface CommentService {
    Comments create(Comments obj);
    boolean delete(Long id) throws CommentNotFoundException;
    Stream<Comments> streamAll();
    List<Comments> findAll();
    Comments update(Comments obj) throws CommentNotFoundException;
    Comments findById(Long id);
}
