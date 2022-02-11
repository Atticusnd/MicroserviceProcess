import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './interfaces/game.interface';
import { GameDTO } from './dto/game.dto';
import { getDiscount } from './tools/discount';

@Injectable()
export class AppService {
  constructor(@InjectModel('Game') private GameModel: Model<Game>) {}
  getHello(): string {
    return 'Hello World!';
  }
  async applieDisccounts() {
    const today = new Date();
    const discountMinDate = new Date(today.setMonth(today.getMonth() - 12));
    const discountMaxDate = new Date(today.setMonth(today.getMonth() - 18));
    console.log(discountMinDate);
    console.log(discountMaxDate);

    const gamesToDelete = await this.GameModel.find({
      releaseDate: { $lte: discountMaxDate },
    }).exec();
    const gamesToDiscount = await this.GameModel.find({
      releaseDate: { $gte: discountMaxDate, $lte: discountMinDate },
    }).exec();
    console.log('entraaaa');
    console.log('To Delete', gamesToDelete);
    for await (const game of gamesToDelete) {
      await this.delete(game._id);
    }
    console.log('To Discount', gamesToDiscount);
    for await (const game of gamesToDiscount) {
      await this.update(game._id, {
        price: getDiscount(game.price),
        title: game.title,
        tags: game.tags,
        releaseDate: game.releaseDate,
        publisher: game.publisher,
      });
    }
    return gamesToDelete;
  }
  async update(id, CreateGameDTO: GameDTO): Promise<any> {
    return await this.GameModel.findByIdAndUpdate(id, CreateGameDTO, {
      new: true,
    });
  }

  async delete(id): Promise<any> {
    return await this.GameModel.findByIdAndRemove(id);
  }
}
