import {HttpClient} from '@angular/common/http';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CrudService} from '../service/crud.service';


@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.scss']
})

export class MessageStreamComponent implements OnInit, OnDestroy {
  messages = [];
  message: string;
  checkUser: string;
  private destroy$ = new Subject();

  constructor(private http: HttpClient,
              private rxStompService: RxStompService,
              private service: CrudService) {
  }

  ngOnInit(): void {
    const elem = document.getElementById('chat');
    setTimeout(() => {
      elem.scrollTop = elem.scrollHeight;
    }, 50);
    this.http.get(`http://localhost:9090/chat/user`, {responseType: 'text'}).subscribe(u => {
      this.checkUser = u;
    });

    this.service.getMessages().subscribe(s => {

      this.messages = s;
      this.rxStompService.watch('/topic/messages')
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe((message: Message) => {
        this.messages.push(message.body);
        setTimeout(() => {
          elem.scrollTop = elem.scrollHeight;
        }, 10);

      });
    });


  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  sendMessage(message): void {
    this.service.chatMess(message).subscribe();
    this.message = '';
    const elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
  }

  isCurrentUser(message: string): boolean {
    return this.checkUser === message.substring(0, message.indexOf(':'));
  }
}
