export const baseUrl: string = 'http://ec2-18-217-35-135.us-east-2.compute.amazonaws.com:8990/';
// Authentication:
export const signUp: string = baseUrl + 'signup';
export const signIn: string = baseUrl + 'signin';
export const exists: string = baseUrl + 'exists';
export const forgetPassword: string = baseUrl + 'forget-password';
// ...................................................
// Account:
export const account: string = baseUrl + 'accounts';
export const updatePassword: string = account + '/forget-password'; // POST
export const updateProfilePic: string = account + '/updatePicture'; // PUT
export const accountUpdate: string = account + '/update'; // PUT
// ..................................................
// Profile:
export const profile: string = baseUrl + 'profile'; // GET && same route by adding username to it.
export const updateProfile: string = profile; // PUT update profile
export const feed: string = profile + '/feed'; // GET
export const addFriend: string = profile + '/addFriend'; // PUT and append username to it
export const unFriend: string = profile + '/unFriend'; // PUT and append username to it
// ..................................................
// Post:
/*GET ALL in the site, + post id gets post by id.
  POST add a post, 
  DELETE  + post id deletes a post,
*/
export const post: string = baseUrl + 'posts'; 
export const postUpdate: string = post + '/update'; // PUT updates post
export const addImage: string = post + '/image'; // POST add image to the post.
export const likePost: string = post + '/like'; // GET add the id of the post to it.
export const disLikePost: string = post + '/dislike'; // GET add the id of the post to it.
// ...................................................
// Comment
export const comment: string = baseUrl + 'comments'; // POST + post id adds comment to it.
export const commentUpdate: string = comment + '/update';
// ...................................................
// File uploads:
export const uploadProfilePic: string = baseUrl + 'uploadProfile'; // POST
export const uploadPostPic: string = baseUrl + 'uploadMedia'; // POST
