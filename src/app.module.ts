import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModel } from './schema/game.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://atticusfj:2005ct27@cluster0.ru2tc.mongodb.net/ultra?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Game', schema: GameModel }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
