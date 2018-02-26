package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.repositories.ProfileRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "profile")
public class ProfileView {
    @Resource
    AccountRepository accountRepository;

    @Resource
    ProfileRepository profileRepository;

    @Autowired
    JwtTokenProvider tokenProvider;
//    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
//    public Profile getProfile(@PathVariable String username) {
//        Account account = this.accountRepository.findByUsername(username);
//        System.out.println(account.getProfile());
//        return account.getProfile();
//    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Profile getProfile(@RequestHeader("Authorization") String token) {
        System.out.println(token);
        Account account = this.accountRepository
                .findByUsername(this.tokenProvider.getUsername(this.refactorToken(token)));
//        System.out.println(account.getUsername());
//        System.out.println(account.getAccountProfile().getAccount().getUsername());
        System.out.println("dfkdfdfkjhfdjfhdjfdhfjdhfdjhfdjdf");
        Profile profile = this.profileRepository.findByUser(this.tokenProvider.getUsername(this.refactorToken(token)));
        System.out.println((profile == null)?true:false);
        return profile;
    }

    private String refactorToken (String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
