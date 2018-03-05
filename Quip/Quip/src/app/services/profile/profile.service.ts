import { Injectable } from '@angular/core';
import { profile, feed, addFriend, unFriend, updateProfilePic, updateProfile } from '../../Interfaces/Backend';
import { Post } from '../../models/Post';
import { Profile } from '../../models/Profile';
import { Account } from '../../models/Account';
import { ActionsService } from '../http/actions.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class ProfileService {
  constructor (private actions: ActionsService,
               private files: FileUploadService,
               private http: Http) { }
  
  public getUserProfile(): Observable<Profile> {
    return this.actions.fetch<Profile>(profile)
            .map(x => new Profile(x['profileId'], x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public getUserProfileByUsername (username: string): Observable<Profile> {
   return this.http.get(profile + '/' + username).map(res =>(res.status < 205)?res.json():res)
           .catch(err => Observable.throw(err))
           .map(x => new Profile(x['profileId'],x['account'], x['posts'], x['friends'], x['recomendedFriends'], x['description']));
  }

  public getFeed(): Observable<Post[]> {
    return this.actions.fetchAll<Post>(feed)
          .map(y => {
            return y.map(x => new Post(x['owner'],x['comments'], x['postText'],
                      x['dislikes'], x['id'], x['likes'],
                      x['mediaUrl'], x['title']));
          })
  }

  public addFriend(username: string): Observable<Profile> {
    return this.actions.fetch<Profile>(addFriend + '/' + username)
            .map(x => new Profile(x['profileId'],x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public unFriend(username: string): Observable<Profile> {
    return this.actions.fetch<Profile>(unFriend + '/' + username)
            .map(x => new Profile(x['profileId'],x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }

  public updateProfilePicture(fileToUpload: File): Observable<Account> {
    return this.files.uploadProfilePicture(fileToUpload)
    .flatMap(x => this.actions.save<Account>(updateProfilePic, x)
            .map(y => new Account(y['id'], y['username'], y['fname'], y['lname'], y['profilePic'],y['email']))
        );

  }
  public updateProfile(profile: Profile): Observable<Profile> {
    return this.actions.save(updateProfile, profile)
                .map(x => new Profile(x['profileId'],x['account'], x['posts'], x['friends'], 
                                  x['recomendedFriends'], x['description']));
  }
}
