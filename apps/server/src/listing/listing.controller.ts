import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createListingDto: Listing,  @UploadedFile() image: Express.Multer.File,) {
    return this.listingService.create(createListingDto, image);
  }

  @Get('user/:userId/applied')
  findAllListingsUserAppliedTo(@Param('userId') userId: string) {
    return this.listingService.findAllListingsUserAppliedTo(userId);
  }

  @Put(':listingId/apply')
  @HttpCode(204) // No Content status code if successful
  async applyToListing(
    @Param('listingId') listingId: string,
    @Body('userId') userId: string
  ) {
    return this.listingService.applyToListing(listingId, userId);
  }

  @Get('user/:userId/owner')
  findAllListingForOwner(@Param('userId') userId: string){
    return this.listingService.finadAllListingOfOwner(userId)

  }

  @Put(':listingId/match')
  @HttpCode(204) // No Content status code if successful
  async matchListing(
    @Param('listingId') listingId: string,
    @Body('userId') userId: string
  ) {
    return this.listingService.MatchedRoom(listingId);
  }

  @Delete(':listingId')
  deleteListing( @Param('listingId') listingId: string){
    return this.listingService.deleteListing(listingId)

  }

}
