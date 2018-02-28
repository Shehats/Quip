package com.evil.scheme.Quip.entities.comments;

import javax.persistence.*;

import com.evil.scheme.Quip.entities.posts.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {
	private Long id;
	private String description;
	private Integer likes;
	private Integer dislikes;

	public Comment() {
	}

    public Comment(String description) {
        this.description = description;
    }

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
