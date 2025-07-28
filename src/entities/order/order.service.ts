import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { BaseService } from 'src/common/base.service';
import { z } from 'zod';
import { CreateOrderSchema, UpdateOrderSchema } from './order.schema';
import { AuthUser } from 'src/decorators/currentUser.decorator';
import { OrderItems } from '../orderItems/orderItems.entity';

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;

@Injectable()
export class OrderService extends BaseService<Order> {
  private readonly orderItemsRepo: Repository<OrderItems>;
  constructor(
    @InjectRepository(Order) repo: Repository<Order>,
    @InjectRepository(OrderItems) orderItemsRepo: Repository<OrderItems>,
  ) {
    super(repo);
    this.orderItemsRepo = orderItemsRepo;
  }

  async createOrderWithItems(user: AuthUser, dto: CreateOrderInput) {
    const { items, ...orderData } = dto;
    const order = this.repo.create(orderData);
    order.companyId = user.companyId;
    await this.repo.save(order);

    const orderItems = items.map((item) => ({
      ...item,
      orderId: order.id,
      quantity: item.quantity.toFixed(2),
    }));

    await this.orderItemsRepo.save(orderItems);
  }

  async updateOrderWithItems(
    user: AuthUser,
    dto: UpdateOrderInput,
    id: string,
  ) {
    const { items, ..._orderData } = dto;

    const existingOrder = await this.getById(id, user.companyId);
    existingOrder.type = dto.type ?? existingOrder.type;
    existingOrder.partnerId = dto.partnerId ?? existingOrder.partnerId;
    existingOrder.date = dto.date ?? existingOrder.date;
    existingOrder.warehouseId = dto.warehouseId ?? existingOrder.warehouseId;
    existingOrder.companyId = user.companyId;
    existingOrder.modifiedBy = user.id;
    await this.repo.save(existingOrder);

    const existingItems = await this.orderItemsRepo.find({
      where: { orderId: id },
    });

    if (!items || !Array.isArray(items)) {
      return { order: existingOrder };
    }

    const itemsToUpdate = items.filter((item) => item.id);
    const itemsToAdd = items.filter((item) => !item.id);
    const itemsToDelete = existingItems.filter(
      (existingItem) => !items.some((i) => i.id === existingItem.id),
    );

    for (const item of itemsToUpdate) {
      await this.orderItemsRepo.update(item.id!, {
        productId: item.productId,
        quantity: item.quantity.toFixed(2),
        modifiedBy: user.id,
      });
    }

    if (itemsToAdd.length) {
      const newItems = itemsToAdd.map((item) => ({
        ...item,
        orderId: id,
        quantity: item.quantity.toFixed(2),
      }));
      await this.orderItemsRepo.save(newItems);
    }

    if (itemsToDelete.length) {
      await Promise.all(
        itemsToDelete.map((item) =>
          this.orderItemsRepo.update(item.id, { modifiedBy: user.id }),
        ),
      );

      await Promise.all(
        itemsToDelete.map((item) => this.orderItemsRepo.softDelete(item.id)),
      );
    }

    return { order: existingOrder };
  }
}
