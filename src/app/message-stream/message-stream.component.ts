import {HttpClient} from '@angular/common/http';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CrudService} from '../service/crud.service';

export class ChatMessage {
  private username: string;
  private message: string;
}

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.scss']
})

export class MessageStreamComponent implements OnInit, OnDestroy {
  messages: string[];
  message: string;
  @Input()
  username: string;
  checkUser: string;
  isOwnMessage = false;
  private destroy$ = new Subject();

  constructor(private http: HttpClient,
              private rxStompService: RxStompService,
              private service: CrudService) {
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:9090/chat/user`, {responseType: 'text'}).subscribe(u => {
      this.checkUser = u;
      console.log(u);
    });

    this.messages = [];
    this.rxStompService.watch('/topic/messages')
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((message: Message) => {
      this.messages.push(message.body);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  sendMessage(message): void {
    this.isOwnMessage = false;
    console.log(message);
    this.service.chatMess(message).subscribe(u => {
      this.username = u.substring(0, u.indexOf(':'));
      console.log('username', u.substring(0, 2));
    });
    this.message = '';
  }
}
