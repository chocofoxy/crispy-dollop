import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_notification')
  createNotification(@Payload() data: Notification) {
    return this.appService.create(data);
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() data: string) {
    return this.appService.findAll(data);
  }

  @MessagePattern('get_unread_notifications')
  getUnreadNotifications(@Payload() data: string) {
    return this.appService.findAllUnread(data);
  }

  @MessagePattern('read_notifications')
  readNotifications(@Payload() data: string[]) {
    return this.appService.readNotifications(data);
  }

  @MessagePattern('read_notification')
  readNotification(@Payload() data: string) {
    return this.appService.readNotification(data);
  }
}
