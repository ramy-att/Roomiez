import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  imageId: string;

  @ApiProperty()
  phone: number 

  @ApiProperty()
  age: number

  @ApiProperty()
  prefrences : {pref : string; exist: boolean}

  constructor(entity: UserEntity) {
    this.id = entity._id;
    this.email = entity.email;
    this.name = entity.name;
    this.imageUrl = entity.imageUrl;
    this.imageId = entity.imageId;
    this.phone = entity.phone;
    this.prefrences = entity.prefrences
    this.age = entity.age
    
  }
}
