package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.comments.Comments;
import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.exceptions.CommentNotFoundException;
import com.evil.scheme.Quip.exceptions.NotOwnerException;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.forms.CommentForm;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import com.evil.scheme.Quip.services.CommentServiceImpl;
import com.evil.scheme.Quip.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static com.evil.scheme.Quip.views.ProfileView.refactorToken;

@RestController
@RequestMapping(value = "comments")
public class CommentView {
    @Resource
    CommentServiceImpl commentService;

    @Resource
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Resource
    PostServiceImpl postService;

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public Post add(@RequestHeader("Authorization") String token,  @PathVariable Long id, @RequestBody CommentForm comment) throws PostNotFoundException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Comments insVal = new Comments((comment.getDescription()));
        insVal.setOwner(account);
        Comments retVal = this.commentService.create(insVal);
        Post post = postService.findById(id);
        post.getComments().add(retVal);
        return this.postService.update(post);
    }

    @RequestMapping(value = "/like/{id}", method = RequestMethod.GET)
    public Comments like (@RequestHeader("Authorization") String token, @PathVariable Long id) throws CommentNotFoundException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Comments post = this.commentService.findById(id);

        int canlike = 0;
        int disliked = 0;
        if (post.getLikes() != null && post.getLikes().size() > 0)
            canlike = post.getLikes().stream().filter(x -> (x.getId().equals(account.getId()))).toArray().length;
        if (post.getDislikes() != null && post.getDislikes().size() > 0)
            disliked = post.getDislikes().stream().filter(x -> (x.getId().equals(account.getId()))).toArray().length;

        if (canlike > 0)
            post.getLikes().remove(account);
        else
            post.getLikes().add(account);
        if (disliked > 0)
            post.getDislikes().remove(account);
        return this.commentService.update(post);
    }

    @RequestMapping(value = "/dislike/{id}", method = RequestMethod.GET)
    public Comments dislike (@RequestHeader("Authorization") String token, @PathVariable Long id) throws CommentNotFoundException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Comments post = this.commentService.findById(id);
        int canlike = 0;
        int disliked = 0;
        if (post.getLikes() != null && post.getLikes().size() > 0)
            canlike = post.getLikes().stream().filter(x -> (x.getId().equals(account.getId()))).toArray().length;
        if (post.getDislikes() != null && post.getDislikes().size() > 0)
            disliked = post.getDislikes().stream().filter(x -> (x.getId().equals(account.getId()))).toArray().length;

        if (disliked > 0)
            post.getDislikes().remove(account);
        else
            post.getDislikes().add(account);
        if (canlike > 0)
            post.getLikes().remove(account);
        return this.commentService.update(post);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public Comments update(@RequestHeader("Authorization") String token, @RequestBody Comments comments) throws CommentNotFoundException, NotOwnerException{
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        if (account.equals(comments.getOwner()))
            return this.commentService.update(comments);
        else
            throw new NotOwnerException("You can't edit this content", HttpStatus.NOT_ACCEPTABLE);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean delete(@RequestHeader("Authorization") String token, @PathVariable Long id) throws CommentNotFoundException, NotOwnerException {
        Account account = this.accountRepository.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
        Comments comments = this.commentService.findById(id);
        if (account.equals(comments.getOwner()))
            return this.commentService.delete(id);
        else
            throw new NotOwnerException("You can't delete this content", HttpStatus.NOT_ACCEPTABLE);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Comments getById(@PathVariable Long id) {
        return this.commentService.findById(id);
    }

}
