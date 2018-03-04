import { Injectable } from '@angular/core';
import { profile, feed, addFriend, unFriend, updateProfilePic, updateProfile } from '../../Interfaces/Backend';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { Account } from '../../models/Account';
import { ActionsService } from '../http/actions.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  constructor (private actions: ActionsService,
               private files: FileUploadService) { }
  public getUserProfile(): Observable<Profile> {
    return this.actions.fetch<Profile>(profile)
            .map(x => new Profile(x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public getUserProfileByUsername (username: string): Observable<Profile> {
    return this.actions.fetch<Profile>(profile + '/' + username)
            .map(x => new Profile(x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public getFeed(): Observable<Post[]> {
    return this.actions.fetchAll<Post>(feed)
          .map(y => {
            return y.map(x => new Post(x['comments'], x['descriptlion'], x['dislikes'],
                                       x['id'], x['likes'], x['mediaUrl'], x['title']));
          })
  }

  public addFriend(username: string): Observable<Profile> {
    return this.actions.update<Profile>(addFriend + '/' + username, null)
            .map(x => new Profile(x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public unFriend(username: string): Observable<Profile> {
    return this.actions.update<Profile>(unFriend + '/' + username, null)
            .map(x => new Profile(x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public updateProfilePicture(fileToUpload: File): Observable<Account> {
    return this.files.uploadProfilePicture(fileToUpload)
    .do(x => {
            this.actions.update<Account>(updateProfilePic, x)
            .map(y => new Account(y['id'], y['username'], y['fname'], y['lname'], y['profilePic'],y['email']))
          },
          err => console.log(err)
        );

  }
  public updateProfile(profile: Profile): Observable<Profile> {
    return this.actions.update(updateProfile, profile)
                .map(x => new Profile(x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }
}
