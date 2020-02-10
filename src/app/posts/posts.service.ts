import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.httpClient.get<{message: string, posts: any, maxPosts: number}>(BACKEND_URL + queryParams)
    .pipe(map((postData) => {
      return { posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator
        };
      }),
      maxPosts: postData.maxPosts
    };
    }))
    .subscribe((transformedPostData) => {
      console.log(transformedPostData);
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({ posts: [...this.posts], postCount: transformedPostData.maxPosts});
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    return this.httpClient
      .post<{ message: string, post: Post }>(BACKEND_URL, postData);
  }

  deletePost(postId: string) {
    return this.httpClient.delete<{message: string}>(BACKEND_URL + '/' + postId);
  }

  getPost(postId: string) {
    return this.httpClient.get<{_id: string,
      title: string,
      content: string,
      imagePath: string,
      creator: string}>(BACKEND_URL + '/' + postId);
  }

  updatePost(postId: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', postId);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: postId, title, content, imagePath: image, creator: null
      };
    }

    return this.httpClient
      .put(BACKEND_URL + '/' + postId, postData);
  }
}
