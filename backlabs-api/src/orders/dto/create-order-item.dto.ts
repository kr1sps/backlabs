// src/orders/dto/create-order-item.dto.ts
import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
