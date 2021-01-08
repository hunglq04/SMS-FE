import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from './utils.service';
@Injectable()
export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    constructor(private angularFireMessaging: AngularFireMessaging,
        private utilsService: UtilsService) {
        this.angularFireMessaging.messages.subscribe(
            (_messaging: AngularFireMessaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        })
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log(token);
                alert(token);
                this.getToken();
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe( (payload: any) => {
            console.log("new message received. ", payload);
            let notifyInfo = payload.notification;
            if (notifyInfo.title === "paid") {
                this.utilsService.showNotification("done", notifyInfo.body, "success", "top", "center")
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            } else {
                this.utilsService.showNotification("error_outline", notifyInfo.body, "danger", "top", "center")
            }
            this.currentMessage.next(payload);
        })
    }

    async getToken() {
        let counter = 0;
        let token = null;
        while (counter < 3 && token == null) {
            counter++;
            await this.delay(3000);
            this.angularFireMessaging.getToken.subscribe(
                async (firebaseToken) => {
                    token = firebaseToken;
                    console.log("request new fcm-tok", firebaseToken)
                },
                (err) => {
                    console.error('Error when getToken.', err);
                }
            );
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}