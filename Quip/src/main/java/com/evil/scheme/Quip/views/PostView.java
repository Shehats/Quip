package com.evil.scheme.Quip.views;

import java.util.List;
import java.util.stream.Collectors;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.exceptions.ProfileNotFoundException;
import com.evil.scheme.Quip.forms.PostForm;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.repositories.ProfileRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import com.evil.scheme.Quip.services.PostServiceImpl;
import com.evil.scheme.Quip.services.ProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static com.evil.scheme.Quip.views.ProfileView.refactorToken;

@RestController
@RequestMapping(value = "posts")
public class PostView {
    @Resource
    PostServiceImpl postService;
    @Resource
    ProfileServiceImpl profileService;

    @Resource
    private AccountRepository accountRepository;

    @Resource
    private ProfileRepository profileRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;


    @RequestMapping(value = "", method = RequestMethod.POST)
    public Profile add(@RequestHeader("Authorization") String token, @RequestBody PostForm post) throws ProfileNotFoundException {
        Profile profile = this.profileRepository.findByUser(this.tokenProvider.getUsername(refactorToken(token)));
        Post post1 = new Post(post.getTitle(), post.getDescription(), post.getMedia());
        Post retVal = this.postService.create(post1);
//        retVal.setParentId(profile);
        profile.getPosts().add(retVal);
        return this.profileService.update(profile);
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public Profile addImage(@RequestHeader("Authorization") String token, @RequestBody Post post) {
        Profile profile = this.profileRepository.findByUser(this.tokenProvider.getUsername(refactorToken(token)));
        profile.getPosts().add(post);
        return this.profileService.update(profile);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Post> getAll() {
        return this.postService.findAll();
    }

    @RequestMapping(value = "/like/{id}", method = RequestMethod.PUT)
    public Post like (@RequestHeader("Authorization") String token, @PathVariable Long id) throws PostNotFoundException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Post post = this.postService.findById(id);
        int canlike = post.getLikes().stream().filter(x -> (x.getId() == account.getId())).toArray().length;
        int disliked = post.getDislikes().stream().filter(x -> (x.getId() == account.getId())).toArray().length;
        if (canlike > 0)
            post.getLikes().remove(account);
        else
            post.getLikes().add(account);
        if (disliked > 0)
            post.getDislikes().remove(account);
        return this.postService.update(post);
    }

    @RequestMapping(value = "/dislike/{id}", method = RequestMethod.PUT)
    public Post dislike (@RequestHeader("Authorization") String token, @PathVariable Long id) throws PostNotFoundException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Post post = this.postService.findById(id);
        int canlike = post.getLikes().stream().filter(x -> (x.getId() == account.getId())).toArray().length;
        int disliked = post.getDislikes().stream().filter(x -> (x.getId() == account.getId())).toArray().length;
        if (disliked > 0)
            post.getDislikes().remove(account);
        else
            post.getDislikes().add(account);
        if (canlike > 0)
            post.getLikes().remove(account);
        return this.postService.update(post);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Post update(@RequestBody Post post) throws PostNotFoundException {
        return this.postService.update(post);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable Long id) throws PostNotFoundException {
        return this.postService.delete(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Post getById(@PathVariable Long id) {
        return this.postService.findById(id);
    }
}
