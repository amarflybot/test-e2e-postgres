import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly repo: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    const person = new Person(
      createPersonDto.name,
      createPersonDto.key,
      createPersonDto.state,
    );
    const person1 = await this.repo.save(person);
    return person1;
  }

  async findAll() {
    return await this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
