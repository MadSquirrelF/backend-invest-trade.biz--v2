import { Module } from '@nestjs/common';
import { CalculationService } from './Calculation.service';
import { CalculationController } from './Calculation.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CalculationModel } from './Calculation.model';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypegooseModule.forFeature([{
    typegooseClass: CalculationModel,
    schemaOptions: {
      collection: 'Calculation'
    }
  }]), UserModule, ProductModule],
  providers: [CalculationService],
  controllers: [CalculationController],
  exports: [CalculationService]
})
export class CalculationModule { }