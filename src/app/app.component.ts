import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngrx-graphql-app-test';
  searchText = '';
  posts$ = this.appService.posts$;
  postsLoading$ = this.appService.postsLoading$;
  currentPage = 1;

  private subscriptions = new Subscription();

  constructor(private appService: AppService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.appService.dispatchPosts();

    this.subscriptions.add(
      this.appService.selectPostItem$.subscribe((data) => {
        if (!data.loading && !data.error && data.remove) {
          this.toastr.success(`Success: Post successfully removed!`);
        }
      })
    );

    this.subscriptions.add(
      this.appService.selectPostItem$.subscribe((data) => {
        if (!data.loading && !data.error && data.update) {
          this.toastr.success(`Success: Post successfully updated!`);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPageChange(paginator: PageChangedEvent) {
    this.appService.dispatchPosts(paginator.page);
  }
}
