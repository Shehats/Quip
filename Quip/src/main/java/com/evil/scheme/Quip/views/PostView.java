package com.evil.scheme.Quip.views;

import java.util.List;
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
    public Profile add(@RequestHeader("Authorization") String token, @ModelAttribute PostForm post) throws ProfileNotFoundException {
        Profile profile = this.profileRepository.findByUser(this.tokenProvider.getUsername(refactorToken(token)));
        Post retVal = this.postService.create(new Post(post.getTitle(), post.getDescription(), post.getMedia()));
        profile.getPosts().add(retVal);
        return this.profileService.update(profile);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Post> getAll() {
        return this.postService.findAll();
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Post update(@ModelAttribute Post post) throws PostNotFoundException {
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
