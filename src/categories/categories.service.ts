import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {

    if (await this.prisma.categories.findFirst({
      where: { categoryname: createCategoryDto.categoryname },
    }).then(res => Boolean(res))
    ) {
      throw new ConflictException("Ya existe registro con los datos ingresados");
    }
    else {
      return await this.prisma.categories.create({
        data:
        {
          categoryname: createCategoryDto.categoryname,
          status: createCategoryDto.status,
          usercreate: createCategoryDto.usercreate
        },
      });
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.categories.findMany();
  }

  async findOne(id: string): Promise<Category | null> {
    return this.prisma.categories.findUnique({ where: { id: id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.categories.update({
      where: { id: id },
      data: { categoryname: updateCategoryDto.categoryname, status: updateCategoryDto.status, dateupdate: new Date(), userupdate: updateCategoryDto.userupdate },
    });
  }

  async remove(id: string) {
    return await this.prisma.categories.delete({
      where: { id: id },
    });
  }
}
