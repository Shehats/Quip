package com.evil.scheme.Quip.services;

import java.util.List;
import java.util.stream.Stream;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.evil.scheme.Quip.control.CommentService;
import com.evil.scheme.Quip.entities.comments.Comment;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;
import com.evil.scheme.Quip.repositories.CommentRepository;

public class CommentServiceImpl implements CommentService{

	@Resource
	private CommentRepository repository;
	
	@Override
	@Transactional
	public Comment create(Comment obj) {
		return this.repository.save(obj);
	}

	@Override
	@Transactional(rollbackFor = CommentNotFoundException.class)
	public boolean delete(Long id) throws CommentNotFoundException {
		Comment comment = this.repository.findOne(id);
		if(comment == null) {
			throw new CommentNotFoundException();
		}
		this.repository.delete(comment);
		return true;
	}

	@Override
	public Stream<Comment> streamAll() {
		return this.repository.findAll().stream();
	}

	@Override
	public List<Comment> findAll() {
		return this.repository.findAll();
	}

	@Override
	public Comment update(Comment obj) throws CommentNotFoundException {
		Comment comment = this.repository.findOne(obj.getId());
		if(comment == null) {
			throw new CommentNotFoundException();
		}
		comment.setParentId(comment.getParentId());
		comment.setDescription(comment.getDescription());
		comment.setLikes(comment.getLikes());
		comment.setDislikes(comment.getDislikes());
		return comment;
	}

	@Override
	public Comment findById(Long id) {
		return this.repository.findOne(id);
	}

}
