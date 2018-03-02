package com.evil.scheme.Quip.entities.comments;

import javax.persistence.*;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Comment {
	private Long id;
	private String description;
	private List<Account> likes;
	private List<Account> dislikes;

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

	@ManyToOne(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Account> getLikes() {
		return likes;
	}
	public void setLikes(List<Account> likes) {
		this.likes = likes;
	}

	@ManyToOne(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Account> getDislikes() {
		return dislikes;
	}
	public void setDislikes(List<Account> dislikes) {
		this.dislikes = dislikes;
	}
}
