package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
import com.evil.scheme.Quip.forms.PictureForm;
import com.evil.scheme.Quip.repositories.AccountRepository;
import com.evil.scheme.Quip.repositories.ProfileRepository;
import com.evil.scheme.Quip.security.JwtTokenProvider;
import com.evil.scheme.Quip.services.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.evil.scheme.Quip.services.AmazonClient;

import javax.annotation.Resource;

import static com.evil.scheme.Quip.views.ProfileView.refactorToken;

@RestController
@RequestMapping("")
public class BucketView {
	private AmazonClient amazonClient;

	@Resource
	private AccountRepository accountRepository;

	@Resource
	private ProfileRepository profileRepository;

	@Resource
	private PostServiceImpl postService;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired()
	public BucketView(AmazonClient amazonClient) {
		super();
		this.amazonClient = amazonClient;
	}

	@PostMapping("/uploadProfile")
	public PictureForm uploadFile(@RequestPart (value = "file") MultipartFile file) {
		return new PictureForm(this.amazonClient.uploadFile(file));
	}

	@PostMapping("/uploadMedia")
	public Post uploadMedia (@RequestPart (value = "file") MultipartFile file) {
		return new Post(this.amazonClient.uploadFile(file));
	}

	@PutMapping("/uploadMedia/{id}")
	public Post updateMedia (@PathVariable Long id, @RequestPart (value = "file") MultipartFile file) throws PostNotFoundException {
		Post post = this.postService.findById(id);
		if (post.getMediaUrl() != null) {
			this.amazonClient.deleteFileFromS3Bucket(post.getMediaUrl());
		}
		post.setMediaUrl(this.amazonClient.uploadFile(file));
		return this.postService.update(post);
	}


}
