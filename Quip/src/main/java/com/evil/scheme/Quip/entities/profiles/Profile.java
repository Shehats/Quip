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

import java.util.List;
import java.util.stream.Stream;

@Entity
@Table
public class Profile {
	private Long profileId;
	private Account account;
	private List<Post> posts;
	private List<Account> friends;
	private List<Account> recomendedFriends;

	public Profile() {
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

	@OneToMany(targetEntity = Post.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	@OneToMany(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Account> getFriends() {
		return friends;
	}

	public void setFriends(List<Account> friends) {
		this.friends = friends;
	}

	@OneToMany(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	public List<Account> getRecomendedFriends() {
		return recomendedFriends;
	}

	public void setRecomendedFriends(List<Account> recomendedFriends) {
		this.recomendedFriends = recomendedFriends;
	}
}
