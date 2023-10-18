import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateBorrowInput } from './create-borrow.input.model';
import { BorrowService } from './borrow.service';
import { UpdateBorrowInput } from './update-borrow.input.model';

@Controller()
export class BorrowController {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly borrowService: BorrowService) {}

  @MessagePattern({ cmd: 'get_borrow' })
  async getBorrow(id: string) {
    return await this.borrowService.getBorrowById(id);
  }

  @MessagePattern({ cmd: 'get_borrows' })
  async getBorrows() {
    return await this.borrowService.getAllBorrows();
  }

  @MessagePattern({ cmd: 'create_borrow' })
  async createBorrow(borrowInput: CreateBorrowInput) {
    try {
      const borrow = await this.borrowService.addBorrow(borrowInput);
      return borrow;
    } catch (err) {
      this.logger.error(err);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message
      });
    }
  }

  @MessagePattern({ cmd: 'update_borrow' })
  async updateBorrow(borrowInput: UpdateBorrowInput) {
    try {
      const { id } = borrowInput;
      if (!id) throw Error('Invalid arguments');
      const borrow = await this.borrowService.updateBorrow(id, borrowInput);
      return borrow;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @MessagePattern({ cmd: 'delete_borrow' })
  async deleteMember(id: string) {
    try {
      return await this.borrowService.deleteBorrow(id);
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(err.message);
    }
  }
}
