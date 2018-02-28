package com.evil.scheme.Quip.exceptions;

public class ProfileNotFoundException extends Exception{
	private static final long serialVersionUID = -3033902885584677286L;

	public ProfileNotFoundException() {
		super();
	}
	
	public ProfileNotFoundException(String message) {
		super(message);
	}
	
	public ProfileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public ProfileNotFoundException(Throwable cause) {
		super(cause);
	}
	
	public ProfileNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}
	
	
}
