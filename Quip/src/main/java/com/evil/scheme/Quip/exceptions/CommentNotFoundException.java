package com.evil.scheme.Quip.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NO_CONTENT)
public class CommentNotFoundException extends Exception{
	private static final long serialVersionUID = -6960413744537888184L;

	public CommentNotFoundException() {
		super();
	}
	
	public CommentNotFoundException(String message) {
		super(message);
	}
	
	public CommentNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public CommentNotFoundException(Throwable cause) {
		super(cause);
	}
	
	public CommentNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
	
}
