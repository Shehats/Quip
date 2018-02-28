package com.evil.scheme.Quip.forms;

public class CommentForm {
    private Long parentId;
    private String description;

    public CommentForm() {
    }

    public Long getParentId() {
        return parentId;
    }
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
