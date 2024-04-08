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

  constructor(entity: UserEntity) {
    this.id = entity._id;
    this.email = entity.email;
    this.name = entity.name;
    this.imageUrl = entity.imageUrl;
    this.imageId = entity.imageId;
  }
}
