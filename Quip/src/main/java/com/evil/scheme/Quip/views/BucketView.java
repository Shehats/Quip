package com.evil.scheme.Quip.views;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.evil.scheme.Quip.services.AmazonClient;

@RestController
@RequestMapping("/storage/")
public class BucketView {

	private AmazonClient amazonClient;

	@Autowired()
	public BucketView(AmazonClient amazonClient) {
		super();
		this.amazonClient = amazonClient;
	}
	@PostMapping("/uploadFile")
	public String uploadFile(@RequestPart (value = "file") MultipartFile file) {
		return this.amazonClient.uploadFile(file);
	}
	
	@DeleteMapping("/deleteFile")
	public String deleteFile (@RequestPart (value = "url") String fileUrl) {
		return this.amazonClient.deleteFileFromS3Bucket (fileUrl);
	}
	

}
