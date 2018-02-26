package com.evil.scheme.Quip.services;

import java.util.List;
import java.util.stream.Stream;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.evil.scheme.Quip.control.ProfileService;
import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.ProfileNotFoundException;
import com.evil.scheme.Quip.repositories.ProfileRepository;

@Service
public class ProfileServiceImpl implements ProfileService{

	@Resource
	private ProfileRepository repository;
	
	@Override
	@Transactional
	public Profile create(Profile obj) {
		return this.repository.save(obj);
		
	}

	@Override
	@Transactional(rollbackFor = ProfileNotFoundException.class)
	public boolean delete(Long id) throws ProfileNotFoundException {
		Profile profile = this.repository.findOne(id);
		if(profile==null) {
			throw new ProfileNotFoundException();
		}
		this.repository.delete(profile);
		return true;
	}

	@Override
	public Stream<Profile> streamAll() {
		return this.repository.findAll().stream();
		
	}

	@Override
	public List<Profile> findAll() {
		return this.repository.findAll();
	}

	@Override
	@Transactional(rollbackFor = ProfileNotFoundException.class)
	public Profile update(Profile obj) throws ProfileNotFoundException {
		Profile profile = this.repository.findOne(obj.getProfileId());
		if(profile == null) {
			throw new ProfileNotFoundException();
		}
		// profile.setAccount(profile.getAccount());
		profile.setFriends(profile.getFriends());
		profile.setPosts(profile.getPosts());
		profile.setRecomendedFriends(profile.getRecomendedFriends());
		return profile;
	}

	@Override
	public Profile findById(Long id) {
		return this.repository.findOne(id);
	}

}
