import {
    Controller,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
    Get,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    ApiCreatedResponse,
  } from '@nestjs/swagger';
  
  import { BookingService } from './booking.service';
  import { Booking } from './booking.entity';
  import { BookingDto, BookingResponseDto } from './booking.dto';
  import { CurrentUser } from '../auth/user.decorator';
  import { User } from '../auth/user.entity';
  import { UserGuard } from '../auth/user.guard';
  
  @ApiBearerAuth()
  @ApiTags('bookings')
  @Controller('bookings')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Post()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Create Booking' })
    @ApiCreatedResponse({
      description: 'Booking Created Succesfully',
      type: BookingResponseDto,
      isArray: false,
      example: {
        car: {
          id: '66bf6c040135859b0ea22231',
          make: 'Toyota',
          model: 'Aqua',
          year: 2020,
          mileage: 22233,
          price: 223443,
          available: false,
        },
        user: {
          id: '66bf31f6c91b815940fe40d2',
          username: 'faizanzafar',
          isSuperUser: false,
        },
        startDate: '2024-08-18T08:14:00',
        endDate: '2024-08-21T08:14:00',
        bookedAt: '2024-08-16T15:11:12.235Z',
        id: '66bf6c100135859b0ea22232',
      },
    })
    create(
      @Body() booking: BookingDto,
      @CurrentUser() user: User,
    ): Promise<Booking> {
      return this.bookingService.create(booking, user);
    }
  
    @Get(':id')
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get Booking' })
    @ApiCreatedResponse({
      description: 'Get Booking Succesfully',
      type: BookingResponseDto,
      isArray: false,
      example: {
        car: {
          id: '66bf6c040135859b0ea22231',
          make: 'Toyota',
          model: 'Aqua',
          year: 2020,
          mileage: 22233,
          price: 223443,
          available: false,
        },
        user: {
          id: '66bf31f6c91b815940fe40d2',
          username: 'faizanzafar',
          isSuperUser: false,
        },
        startDate: '2024-08-18T08:14:00',
        endDate: '2024-08-21T08:14:00',
        bookedAt: '2024-08-16T15:11:12.235Z',
        id: '66bf6c100135859b0ea22232',
      },
    })
    findOne(@Param('id') id: string): Promise<Booking> {
      return this.bookingService.findById(id);
    }
  
    @Delete(':id')
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Cancel Booking' })
    @ApiCreatedResponse({
      description: 'Booking cancelled Succesfully',
      isArray: false,
    })
    cancel(@Param('id') id: string): Promise<void> {
      return this.bookingService.cancel(id);
    }
  }
  