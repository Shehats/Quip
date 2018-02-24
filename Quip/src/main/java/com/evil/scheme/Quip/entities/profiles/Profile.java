package com.evil.scheme.Quip.entities.profiles;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;

@Entity
@Table
public class Profile {
	private Long profileId;
	private Account account;
	private Post[] posts;
	private Account[] friends;
	private Account[] recomendedFriends;
	
	
	public Profile() {
		
	}


	public Profile(Account account) {
		super();
		this.account = account;
	}


	public Profile(Account account, Post[] posts) {
		super();
		this.account = account;
		this.posts = posts;
	}


	public Profile(Account account, Account[] friends) {
		super();
		this.account = account;
		this.friends = friends;
	}


	public Profile(Account account, Post[] posts, Account[] friends) {
		super();
		this.account = account;
		this.posts = posts;
		this.friends = friends;
	}
	
	public Profile(Account account, Account[] friends, Account[] recomendedFriends) {
		super();
		this.account = account;
		this.friends = friends;
		this.recomendedFriends = recomendedFriends;
	}


	public Profile(Account account, Post[] posts, Account[] friends, Account[] recomendedFriends) {
		super();
		this.account = account;
		this.posts = posts;
		this.friends = friends;
		this.recomendedFriends = recomendedFriends;
	}
	
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	public Long getProfileId() {
		return profileId;
	}


	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}
	
	@OneToOne(targetEntity = Account.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	public Account getAccount() {
		return account;
	}


	public void setAccount(Account account) {
		this.account = account;
	}

	@OneToMany(targetEntity = Post.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderColumn()
	public Post[] getPosts() {
		return posts;
	}


	public void setPosts(Post[] posts) {
		this.posts = posts;
	}

	@OneToMany(targetEntity = Account.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderColumn()
	public Account[] getFriends() {
		return friends;
	}


	public void setFriends(Account[] friends) {
		this.friends = friends;
	}

	@OneToMany(targetEntity = Account.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderColumn()
	public Account[] getRecomendedFriends() {
		return recomendedFriends;
	}


	public void setRecomendedFriends(Account[] recomendedFriends) {
		this.recomendedFriends = recomendedFriends;
	}




	
	
	
}
