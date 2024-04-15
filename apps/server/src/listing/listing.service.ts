import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Listing } from './entities/listing.entity';

import { Model } from 'mongoose';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { UserService } from 'src/user/user.service';
import { Types } from 'mongoose';
import { types } from 'util';
import { _isEqual } from 'Lodash';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel('Listing') public readonly listingModel: Model<Listing>,
    public cloudinary: CloudinaryService,
    public userService: UserService,
  ) {}
  async create(createListingDto: Listing, image) {
    const { imageUrl, imageId } = await this.uploadProfileImage(image);
    const ownerId = new Types.ObjectId(createListingDto.owner);
    const listing = new this.listingModel({
      ...createListingDto,
      applicants: [],
      imageId: imageId,
      imageUrl: imageUrl,
    });

    return listing.save();
    // we need to create just listing without ay applicants and the we can have a route to add applicant
  }

  async findAllListingsUserAppliedTo(userId): Promise<Listing[]> {
    const listing = await this.listingModel.find().exec();
    const filtered_listing = listing.filter((x) => {
      return x.applicants.includes(userId);
    });
    return filtered_listing;
  }

  async findAllListingsOfOwner(userID) {
    const listings = await this.listingModel.find().exec();
    const filtered = listings.filter((x) => {
      JSON.stringify(x.owner).localeCompare(userID);
    });
    return filtered;
  }

  private async uploadProfileImage(image: Express.Multer.File | undefined) {
    if (!image) {
      return {
        imageUrl:
          'https://res.cloudinary.com/dzu5t20lr/image/upload/v1706910325/m9ijj0xc1d2yzclssyzc.png',
        imageId: 'default_user',
      };
    }
    const { secure_url: imageUrl, public_id: imageId } =
      await this.cloudinary.uploadFile(image);

    return { imageUrl, imageId };
  }

  async applyToListing(listingId: string, userId): Promise<Listing> {
    console.log('sjbkdjsb');
    // const id = new Types.ObjectId(listingId)
    const listing = await this.listingModel.findById(listingId).exec();
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // Check if the user has already applied
    if (listing.applicants.includes(userId)) {
      throw new BadRequestException('You have already applied to this listing');
    }

    // Add user to applicants
    listing.applicants.push(userId);
    await listing.save();
    return listing;
  }

  async MatchedRoom(listingId: string) {
    let listing = await this.listingModel.findById(listingId);
    listing.status = 'matched';
    await listing.save();
    return listing;
  }

  async getAll() {
    return await this.listingModel.find();
  }

  async getListing(id: string) {
    return await this.listingModel.findById(id);
  }

  async deleteListing(listingId) {
    const listing = await this.listingModel.findById(listingId);
    if (!listing) {
      throw new NotFoundException('Listing is not found');
    }
    const id = new Types.ObjectId(listingId);
    return this.listingModel.deleteOne(id);
  }

  async getAllApplicants(listingId) {
    const listing = await this.listingModel.findById(listingId);

    const x = listing.applicants[0];
    if (x) {
      const applicantsPromises = listing.applicants.map((x) =>
        this.userService.userModel.findOne({ _id: x.toString() }),
      );

      // Resolve all promises to get the full list of applicant details
      const applicants = await Promise.all(applicantsPromises);
      return applicants;
    }
    return [];
  }
}
