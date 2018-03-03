package com.evil.scheme.Quip.entities.posts;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.comments.Comments;
import com.evil.scheme.Quip.entities.profiles.Profile;

import javax.persistence.*;
import java.util.List;
import java.io.*;

@Entity
public class Post implements Serializable{
    private Long id;
    private Account owner;
    private String title;
    private String description;
    private String mediaUrl;
    private List<Account> likes;
    private List<Account> dislikes;
    private List<Comments> comments;

    public Post () {
    }

    public Post (String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public Post (String title, String description, String mediaUrl, List<Account> likes, List<Account> dislikes, List<Comments> comments) {
        this.title = title;
        this.description = description;
        this.mediaUrl = mediaUrl;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = comments;
    }

    public Post (String title, String description, String mediaUrl) {
        this.title = title;
        this.description = description;
        this.mediaUrl = mediaUrl;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    @OneToOne(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public Account getOwner() {
        return owner;
    }
    public void setOwner(Account owner) {
        this.owner = owner;
    }

    @Column(name = "media")
    public String getMediaUrl() {
        return mediaUrl;
    }
    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    @Column(name = "title")
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name = "description")
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToMany(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public List<Account> getLikes() {
        return likes;
    }
    public void setLikes(List<Account> likes) {
        this.likes = likes;
    }

    @ManyToMany(targetEntity = Account.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public List<Account> getDislikes() {
        return dislikes;
    }
    public void setDislikes(List<Account> dislikes) {
        this.dislikes = dislikes;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "parentPost")
    public List<Comments> getComments() {
        return comments;
    }
    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }
}
