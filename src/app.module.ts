import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CustomProvidersModule } from './custom-providers/custom-providers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //can specify mutiple paths
      // envFilePath: '.env.local',
      // to ignore env file, for instance in production environment
      // ignoreEnvFile: true,
      // validationSchema: Joi.object({
      //   DB_HOST: Joi.required().default('localhost'),
      // }),
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: process.env.DB_HOST, // database host
      port: 5432, // database host
      username: process.env.DB_USERNAME, // username
      password: process.env.DB_PASSWORD, // user password
      database: 'postgres', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
    }),
    CoffeeRatingModule,
    CustomProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
