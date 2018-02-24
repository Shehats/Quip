package com.evil.scheme.Quip.exceptions;

public class AccountNotFountException extends Exception{
    public AccountNotFountException() {
        super();
    }

    public AccountNotFountException(String message) {
        super(message);
    }

    public AccountNotFountException(String message, Throwable cause) {
        super(message, cause);
    }

    public AccountNotFountException(Throwable cause) {
        super(cause);
    }

    protected AccountNotFountException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
