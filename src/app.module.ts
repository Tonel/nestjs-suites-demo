import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TestModule } from './test/test.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [ProductsModule, TestModule, TestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
