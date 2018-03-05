package com.evil.scheme.Quip.forms;

public class PictureForm {
	private String picUrl;

	public PictureForm () {
	}

	public PictureForm (String picUrl) {
		this.picUrl = picUrl;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
}