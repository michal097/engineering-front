import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CrudService} from '../service/crud.service';
import {MatDialog} from "@angular/material/dialog";
import {PersonalChatComponent} from "./personal-chat/personal-chat.component";

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
  chatId: any;
  availableChats: any;
  chatMap = new Map();
  constructor(private http: HttpClient,
              private rxStompService: RxStompService,
              private service: CrudService,
              public dialog: MatDialog) {
  }

  getChatCounterImpl(chatID, sendFrom): number {
    let counter = 0;
    this.service.getChatCounter(chatID, sendFrom).subscribe(c => {
      counter = c;
    });
    return counter;
  }

  openDialog(chatKey, chatValue): void {
    if (chatKey === '' || chatValue === undefined) {
      chatKey = this.startChat(chatValue);
    }
    this.getChatsToWite();
    this.getAvailableChats();
    const dialogRef = this.dialog.open(PersonalChatComponent, {
      width: '78%',
      data: [chatKey, chatValue]
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  markAsReadedImpl(chatId, sendFrom): void{
    this.service.markAsRead(chatId, sendFrom).subscribe();
  }

  getAvailableChats(): void {
    this.service.getMyChats(this.checkUser).subscribe(chat => {
      this.chatId = chat;
      let k = Object.keys(chat);
      console.log(chat);
      console.log(chat.BRysia_mtor);

      for (let key in k) {
        let tempArr = [];
        this.service.getChatCounter(k[key],chat[k[key]]).subscribe(c => {
          tempArr.push(chat[k[key]],c);
          this.chatMap.set(k[key], tempArr)
          console.log(tempArr[1]);

        });
      }
      console.log(this.chatMap);
    });
  }

  startChat(targetUser): string {
    let chatId = '';
    this.service.startChatting(targetUser).subscribe(chat => {
      chatId = chat;
      return chat;
    });
    return chatId;
  }

  getChatsToWite(): void {
    this.service.getAvailableChats().subscribe(aChats => this.availableChats = aChats);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAvailableChats();
      this.getChatsToWite();
    }, 1000);
    const elem = document.getElementById('chat');
    setTimeout(() => {
      elem.scrollTop = elem.scrollHeight;
    }, 50);
    this.http.get(`http://localhost:9090/chat/user`, {responseType: 'text'}).subscribe(u => {
      this.checkUser = u
    });

    this.service.getMessages().subscribe(s => {

      this.messages = s;
      this.rxStompService.watch('/topic/messages')
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe((message: Message) => {

        const jsonObj = JSON.parse(message.body);
        console.log(jsonObj);
        console.log(new Date(jsonObj.timeStamp).toLocaleTimeString())
        this.messages.push(jsonObj);
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

  isCurrentUser(username: string): boolean {
    return this.checkUser === username;
  }
}
