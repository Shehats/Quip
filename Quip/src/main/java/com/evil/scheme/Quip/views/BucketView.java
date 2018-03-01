package com.evil.scheme.Quip.views;

import com.evil.scheme.Quip.entities.accounts.Account;
import com.evil.scheme.Quip.entities.posts.Post;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.PostNotFoundException;
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
	public Profile uploadFile(@RequestHeader("Authorization") String token, @RequestPart (value = "file") MultipartFile file) {
		Account account = this.accountRepository
				.findByUsername(this.tokenProvider.getUsername(refactorToken(token)));
		this.amazonClient.deleteFileFromS3Bucket(account.getProfilePic());
		account.setProfilePic(this.amazonClient.uploadFile(file));
		return this.profileRepository.findByUser(account.getUsername());
	}

	@PostMapping("/uploadMedia")
	public Post uploadMedia (@RequestPart (value = "file") MultipartFile file) {
		Post post = new Post(this.amazonClient.uploadFile(file));
		return this.postService.create(post);
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

//	@DeleteMapping("/deleteFile")
//	public String deleteFile (@RequestPart (value = "url") String fileUrl) {
//		return this.amazonClient.deleteFileFromS3Bucket (fileUrl);
//	}
	

}
