package com.evil.scheme.Quip.entities.comments;

import javax.persistence.*;

import com.evil.scheme.Quip.entities.posts.Post;

@Entity
@Table(name = "comment")
public class Comment {
	
	private Long id;
	private Post post;
	private String description;
	private Integer likes;
	private Integer dislikes;

	public Comment() {
	}
	
	public Comment(Long id) {
		super();
		this.id = id;
	}

	public Comment(Long id, Post post) {
		super();
		this.id = id;
		this.post = post;
	}

	public Comment(Long id, Post post, String description) {
		super();
		this.id = id;
		this.post = post;
		this.description = description;
	}

	public Comment(Long id, Post parentId, String description, Integer likes) {
		super();
		this.id = id;
		this.post = parentId;
		this.description = description;
		this.likes = likes;
	}

	public Comment(Long id, Post parentId, String description, Integer likes, Integer dislikes) {
		super();
		this.id = id;
		this.post = parentId;
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
	public Post getPost() {
		return post;
	}
	public void setPost(Post post) {
		this.post = post;
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
