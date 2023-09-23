import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreatePostService } from './create-post.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit, OnDestroy {
  postItemLoading$ = this.createPostService.postItemLoading$;
  modalRef?: BsModalRef | null;
  title: string = '';
  body: string = '';

  private subscriptions = new Subscription();

  constructor(
    private modalService: BsModalService,
    private createPostService: CreatePostService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.createPostService.selectPostItem$.subscribe((data) => {
        if (!data.loading && !data.error && data.create) {
          this.modalRef?.hide();
          this.toastr.success(`Success: Post successfully created!`);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg',
    });
  }

  create() {
    this.createPostService.dispatchCreatePost({
      input: { title: this.title, body: this.body },
    });
  }
}
