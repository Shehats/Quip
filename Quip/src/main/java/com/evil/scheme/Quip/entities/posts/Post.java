package com.evil.scheme.Quip.entities.posts;

import com.evil.scheme.Quip.entities.comments.Comment;
import com.evil.scheme.Quip.entities.profiles.Profile;

import javax.persistence.*;
import java.util.List;

@Entity
public class Post{
    private Long id;
    private Long parentId;
    private String title;
    private String description;
    private String mediaUrl;
    private Integer likes;
    private Integer dislikes;
    private List<Comment> comments;

    public Post () {
    }

    public Post (String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public Post (String title, String description, String mediaUrl, Integer likes, Integer dislikes, List<Comment> comments) {
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
    @ManyToOne(cascade = CascadeType.ALL,targetEntity = Profile.class)
	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
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

    @OneToMany(targetEntity = Comment.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
