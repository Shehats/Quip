package com.evil.scheme.Quip.forms;

public class PostForm {
    private Long profileId;
    private String title;
    private String description;
    private String mediaUrl;
    private byte[] picture;

    public PostForm() {
    }

    public Long getProfileId() {
        return profileId;
    }
    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getMediaUrl() {
        return mediaUrl;
    }
    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public byte[] getPicture() {
        return picture;
    }
    public void setPicture(byte[] picture) {
        this.picture = picture;
    }
}
