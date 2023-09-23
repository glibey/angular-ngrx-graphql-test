import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { Post } from '../store/post.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  title = '';
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.title = this.post.title;
  }

  openModal(template: TemplateRef<any>, size: string) {
    this.modalRef = this.modalService.show(template, { class: size });
  }

  update() {
    this.postService.dispatchUpdatePost({
      id: Number(this.post.id),
      input: {
        body: this.title,
      },
    });
    this.modalRef?.hide();
  }

  remove() {
    this.postService.dispatchRemovePost({
      id: Number(this.post.id),
    });
    this.modalRef?.hide();
  }
}
