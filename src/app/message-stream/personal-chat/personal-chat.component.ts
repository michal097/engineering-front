import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CrudService} from "../../service/crud.service";
import {takeUntil} from "rxjs/operators";
import {Message} from '@stomp/stompjs';
import {Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {RxStompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.scss']
})
export class PersonalChatComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PersonalChatComponent>,
               @Inject(MAT_DIALOG_DATA) public data: string,
               private service: CrudService,
               private rxStompService: RxStompService,
               private http: HttpClient) {}

  messages = [];
  private destroy$ = new Subject();
  checkUser: string;
  message: string;
  chatId = this.data[0];
  username = this.data[1];
  chatInstance: any;

  ngOnInit() {
    const elem = document.getElementById('personalChat');
    setTimeout(() => {
      elem.scrollTop = elem.scrollHeight;
      console.log('personal')

    }, 100);
    this.http.get(`http://localhost:9090/chat/user`, {responseType: 'text'}).subscribe(u => {
      this.checkUser = u;
    });
setTimeout(()=>{
    this.service.getSpecChat(this.data[1]).subscribe(s => {
    console.log(s);
      let mapKey = Object.keys(s);
      this.chatId = mapKey[0];
      this.messages = s[this.chatId];

       this.rxStompService.watch('/topic/messages/'+ this.chatId)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe((message: Message) => {
        const jsonObj = JSON.parse(message.body);

        this.messages.push(jsonObj);
        setTimeout(() => {
          elem.scrollTop = elem.scrollHeight;
        }, 20);
      });
    });}, 50
  );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  isCurrentUser(username: string): boolean {
    return this.checkUser === username;
  }
  sendMessage(message): void {
    this.service.chatMessToPersonal(this.username, message).subscribe(chat => this.chatInstance = chat);
    this.message = '';
    const elem = document.getElementById('chat');
    elem.scrollTop = elem.scrollHeight;
  }
}
