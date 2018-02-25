package com.evil.scheme.Quip.entities.comments;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.evil.scheme.Quip.entities.posts.Post;

@Entity
public class Comment {
	
	private Long id;
	private Post parentId;
	private String description;
	private Integer likes;
	private Integer dislikes;
//	id: number;
//	parentId: number;
//	description: string;
//	likes: number;
//	dislikes: number;
	public Comment() {
		
	}
	
	public Comment(Long id) {
		super();
		this.id = id;
	}

	public Comment(Long id, Post parentId) {
		super();
		this.id = id;
		this.parentId = parentId;
	}

	public Comment(Long id, Post parentId, String description) {
		super();
		this.id = id;
		this.parentId = parentId;
		this.description = description;
	}

	public Comment(Long id, Post parentId, String description, Integer likes) {
		super();
		this.id = id;
		this.parentId = parentId;
		this.description = description;
		this.likes = likes;
	}

	public Comment(Long id, Post parentId, String description, Integer likes, Integer dislikes) {
		super();
		this.id = id;
		this.parentId = parentId;
		this.description = description;
		this.likes = likes;
		this.dislikes = dislikes;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	@ManyToOne(targetEntity = Post.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	public Post getParentId() {
		return parentId;
	}

	public void setParentId(Post parentId) {
		this.parentId = parentId;
	}
	@Column(name = "description")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	@Column(name = "likes")
	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}
	@Column(name = "dislikes")
	public Integer getDislikes() {
		return dislikes;
	}

	public void setDislikes(Integer dislikes) {
		this.dislikes = dislikes;
	}
	
	
	
}
