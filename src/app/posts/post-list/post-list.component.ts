import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscribable, Subscription } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 50];
  isUserAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    });

    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, error => {
      this.isLoading = false;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
