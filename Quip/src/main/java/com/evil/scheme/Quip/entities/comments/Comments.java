package com.evil.scheme.Quip.entities.comments;

import javax.persistence.*;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.io.*;

@Entity
public class Comments implements Serializable{
	private Long id;
	private Account owner;
	private String description;
	private Post parentPost;
	private List<Account> likes;
	private List<Account> dislikes;

	public Comments() {
	}

    public Comments(String description) {
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

	@OneToOne(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Account getOwner() {
		return owner;
	}
	public void setOwner(Account owner) {
		this.owner = owner;
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

	@ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public Post getParentPost() {
		return parentPost;
	}
	public void setParentPost(Post parentPost) {
		this.parentPost = parentPost;
	}
}
