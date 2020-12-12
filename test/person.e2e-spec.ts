import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PersonService } from '../src/person/person.service';
import { CreatePersonDto } from '../src/person/dto/create-person.dto';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { configService } from '../src/config/config.service';

/*
class MockTypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite' as any,
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: [`${__dirname}/../!**!/!*.entity.{ts,js}`],
    };
  }
}
const mockTypeOrmConfigService = new MockTypeOrmConfigService();
*/

describe('PersonController (e2e)', () => {
  let app: INestApplication;
  let personRepository: PersonService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      //.overrideProvider(configService)
      //.useValue(mockTypeOrmConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    personRepository = moduleFixture.get<PersonService>(PersonService);
  });

  it('/person (GET)', async () => {
    const createPersonDto = new CreatePersonDto();
    createPersonDto.name = 'Amar';
    createPersonDto.state = { name: 'Amarendra Kumar' };
    createPersonDto.key = 'k1';
    await personRepository.create(createPersonDto);
    const response = await request(app.getHttpServer())
      .get('/person')
      .expect(200);
    expect(response.body[0].name).toEqual('Amar');
  });
});
