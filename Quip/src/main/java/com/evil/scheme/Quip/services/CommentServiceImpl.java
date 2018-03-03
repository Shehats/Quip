package com.evil.scheme.Quip.services;

import java.util.List;
import java.util.stream.Stream;

import javax.annotation.Resource;

import com.evil.scheme.Quip.entities.comments.Comments;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.evil.scheme.Quip.control.CommentService;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;
import com.evil.scheme.Quip.repositories.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService{

	@Resource
	private CommentRepository repository;
	
	@Override
	@Transactional
	public Comments create(Comments obj) {
		return this.repository.save(obj);
	}

	@Override
	@Transactional(rollbackFor = CommentNotFoundException.class)
	public boolean delete(Long id) throws CommentNotFoundException {
		Comments comments = this.repository.findOne(id);
		if(comments == null) {
			throw new CommentNotFoundException();
		}
		this.repository.delete(comments);
		return true;
	}

	@Override
	public Stream<Comments> streamAll() {
		return this.repository.findAll().stream();
	}

	@Override
	public List<Comments> findAll() {
		return this.repository.findAll();
	}

	@Override
	public Comments update(Comments obj) throws CommentNotFoundException {
		Comments comments = this.repository.findOne(obj.getId());
		if(comments == null) {
			throw new CommentNotFoundException();
		}
		comments.setDescription(obj.getDescription());
		comments.setLikes(obj.getLikes());
		comments.setDislikes(obj.getDislikes());
		return comments;
	}

	@Override
	public Comments findById(Long id) {
		return this.repository.findOne(id);
	}

}
