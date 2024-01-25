import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async create(notificationDto: Notification): Promise<Notification> {
    const notification = new this.notificationModel(notificationDto);
    return notification.save();
  }

  async findAll(id: string): Promise<Notification[]> {
    return this.notificationModel.find({ user: id }).exec();
  }

  async findAllUnread(id: string): Promise<Notification[]> {
    return this.notificationModel.find({ user: id, read: false }).exec();
  }

  async readNotification(id: string): Promise<Notification> {
    return this.notificationModel
      .findOneAndUpdate({ _id: id }, { read: true })
      .exec();
  }

  async readNotifications(ids: string[]): Promise<Notification[]> {
    return this.notificationModel
      .updateMany({ _id: { $in: ids } }, { read: true })
      .exec()
      .then(() => this.notificationModel.find({ _id: { $in: ids } }).exec());
  }
}
