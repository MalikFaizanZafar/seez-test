import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    UseGuards,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    ApiCreatedResponse,
  } from '@nestjs/swagger';

  import { CarService } from './car.service';
  import { Car } from './car.entity';
  import { UserGuard } from '../auth/user.guard';
  import { SuperUserGuard } from '../auth/super-user.guard';
  import {
    CreateCarDto,
    FindCarsDto,
    PaginatedResponseDto,
    UpdateCarDto,
  } from './car.dto';
  
  @ApiBearerAuth() // swagger tag for authoentication
  @ApiTags('cars')
  @Controller('cars')
  export class CarController {
    constructor(private readonly carService: CarService) {}
  
    @Post()
    @UseGuards(UserGuard, SuperUserGuard) // Only super user should have the ability to perform this action
    @ApiOperation({ summary: 'Create Car' })
    @ApiCreatedResponse({
      description: 'Created Succesfully',
      type: Car,
      isArray: false,
      example: {
        id: '66bee3dd71e608b7590ae586',
        make: 'Toyota',
        model: 'Fortuner Legender EE',
        year: 2020,
        mileage: 22233,
        price: 223443,
        available: true,
      },
    })
    create(@Body() car: CreateCarDto): Promise<Car> {
      return this.carService.create(car);
    }
  
    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get Cars' })
    @ApiCreatedResponse({
      description: 'Get Cars Succesfully',
      type: PaginatedResponseDto,
      isArray: false,
      example: {
        payload: [
          {
            id: '66bee3dd71e608b7590ae586',
            make: 'Toyota',
            model: 'Fortuner Legender EE',
            year: 2020,
            mileage: 22233,
            price: 223443,
            available: true,
            numberOfBookings: 0,
          },
          {
            id: '66bee3dd71e608b7590ae586',
            make: 'Honda',
            model: 'Civic',
            year: 2020,
            mileage: 22233,
            price: 223443,
            available: true,
            numberOfBookings: 0,
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
      },
    })
    findAll(@Query() query: FindCarsDto): Promise<PaginatedResponseDto<Car>> {
      return this.carService.findAll(query);
    }
  
    @Get(':id')
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get Car' })
    @ApiCreatedResponse({
      description: 'Get Car Succesfully',
      type: Car,
      isArray: false,
      example: {
        id: '66bee3dd71e608b7590ae586',
        make: 'Toyota',
        model: 'Fortuner Legender EE',
        year: 2020,
        mileage: 22233,
        price: 223443,
        available: true,
        numberOfBookings: 0,
      },
    })
    async findOne(@Param('id') id: string): Promise<Car> {
      return this.carService.findById(id);
    }
  
    @Patch(':id')
    @UseGuards(UserGuard, SuperUserGuard) // only super user should be able to update car
    @ApiOperation({ summary: 'Update Car' })
    @ApiCreatedResponse({
      description: 'Update Car Succesfully',
      type: Car,
      isArray: false,
      example: {
        id: '66bee3dd71e608b7590ae586',
        make: 'Toyota',
        model: 'Fortuner Legender EE',
        year: 2020,
        mileage: 22233,
        price: 223443,
        available: true,
        numberOfBookings: 0,
      },
    })
    async update(
      @Param('id') id: string,
      @Body() updateCarDto: UpdateCarDto,
    ): Promise<Car> {
      return this.carService.update(id, updateCarDto);
    }
  
    @Delete(':id')
    @UseGuards(UserGuard, SuperUserGuard) // only superuser should be able to delete car
    @ApiOperation({ summary: 'Delete Car' })
    @ApiCreatedResponse({
      description: 'Delete Car Succesfully',
      isArray: false,
    })
    async remove(@Param('id') id: string): Promise<void> {
      return this.carService.remove(id);
    }
  }
  