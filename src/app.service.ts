import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './interfaces/game.interface';

@Injectable()
export class AppService {
  constructor(@InjectModel('Game') private GameModel: Model<Game>) {}
  getHello(): string {
    return 'Hello World!';
  }
  async applieDisccounts(): Promise<boolean> {
    const today = new Date();
    const discountMinDate = new Date(today.setMonth(today.getMonth() + 12));
    const discountMaxDate = new Date(today.setMonth(today.getMonth() + 18));
    const games = await this.GameModel.find().exec();
    return true;
  }
}
