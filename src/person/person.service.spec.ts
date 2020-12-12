import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { getRepository, Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import Mock = jest.Mock;
import { getRepositoryToken } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    createUserDefault: jest.fn((entity) => entity),
  }),
);
export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: jest.Mock<{}>;
};
describe('PersonService', () => {
  let service: PersonService;
  let personMock: MockType<Repository<Person>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    personMock = module.get(getRepositoryToken(Person));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(personMock).toBeDefined();
  });
});
