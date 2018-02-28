package com.evil.scheme.Quip.control;


import java.util.List;
import java.util.stream.Stream;

import com.evil.scheme.Quip.entities.profiles.Profile;
import com.evil.scheme.Quip.exceptions.ProfileNotFoundException;

public interface ProfileService {
    Profile create(Profile obj);
    boolean delete(Long id) throws ProfileNotFoundException;
    Stream<Profile> streamAll();
    List<Profile> findAll();
    Profile update(Profile obj) throws ProfileNotFoundException;
    Profile findById(Long id);
}
