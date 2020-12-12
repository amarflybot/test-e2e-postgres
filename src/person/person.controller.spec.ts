import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { MockType } from './person.service.spec';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

describe('PersonController', () => {
  let controller: PersonController;
  let repositoryMock: MockType<Repository<Person>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: {
            get: jest.fn(() => repositoryMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
