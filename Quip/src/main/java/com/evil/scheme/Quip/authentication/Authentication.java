package com.evil.scheme.Quip.authentication;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.accounts.Role;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.AuthException;
import com.evil.scheme.Quip.forms.LoginForm;
import com.evil.scheme.Quip.forms.RegisterationForm;
import com.evil.scheme.Quip.forms.Token;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import com.evil.scheme.Quip.services.AccountServiceImpl;
import com.evil.scheme.Quip.services.EmailService;
import com.evil.scheme.Quip.services.ProfileServiceImpl;
import org.codehaus.jackson.annotate.JsonValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("")
public class Authentication {
    @Resource
    private AccountServiceImpl accountService;

    @Resource
    private ProfileServiceImpl profileService;

    @Resource
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signin")
    @ResponseBody
    public Token signin(@RequestBody LoginForm loginForm) throws AuthException{
        Account account = this.accountRepository.findByEmailOrUsername(loginForm.getUsername());
        if (account != null) {
            if (this.passwordEncoder.matches(loginForm.getPassword(), account.getPassword())) {
                try {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(),loginForm.getPassword()));
                    return new Token(jwtTokenProvider.createToken(account.getUsername(), account.getRoles()), new Long(604800000));
                } catch (AuthenticationException e) {
                    throw new AuthException("Invalid Credentials", HttpStatus.UNPROCESSABLE_ENTITY);
                }
            }
        }
        throw new AuthException("User not found", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @PostMapping("/signup")
    @ResponseBody
    public Token signUp(@RequestBody RegisterationForm registerationForm) throws AuthException{
        if (!(this.accountRepository.exists(registerationForm.getUsername())
                || this.accountRepository.exists(registerationForm.getEmail()))) {
            try {
                Account account = new Account(registerationForm.getUsername(),
                        registerationForm.getPassword(),
                        registerationForm.getFname(),
                        registerationForm.getLname(),
                        registerationForm.getEmail());
                account.setPassword(this.passwordEncoder.encode(account.getPassword()));
                account.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));
                Account account1 = this.accountService.create(account);
                Profile profile = new Profile();
                profile.setAccount(account);
                this.emailService.sendMail(registerationForm.getEmail(), "Welcome to Quip", "Thank you for signing up");
                this.profileService.create(profile);
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(account1.getUsername(), registerationForm.getPassword()));
                return new Token(jwtTokenProvider.createToken(account.getUsername(), account1.getRoles()), new Long(604800000));
            } catch (AuthenticationException e) {
                throw new AuthException("Invalid Credentials", HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }else
           throw new AuthException("Account already exists.", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/exists")
    public @ResponseStatus
    HttpStatus exists(@RequestBody RegisterationForm registerationForm) {
        return (!(this.accountRepository.exists(registerationForm.getUsername())
                || this.accountRepository.exists(registerationForm.getEmail()))) ? HttpStatus.OK : HttpStatus.NOT_ACCEPTABLE;
    }

    @GetMapping("/forget-password/{email}")
    public void forgetPassword(@PathVariable String email) throws AuthException{
        Account account = this.accountRepository.findByEmailOrUsername(email);
        if (account != null) {
            String token = jwtTokenProvider.createToken(account.getUsername(), account.getRoles());
            this.emailService.sendMail(email, "Reset password", "Click on the link http://localhost:4200/forgot-password-confirmation/" 
                                                                + token + "to reset password");
        } else {
            throw new AuthException("Account doesn't exist.", HttpStatus.UNAUTHORIZED);
        }
    }
}
