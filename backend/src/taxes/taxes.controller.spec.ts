import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';
import { TaxesControllerV1 } from './taxes.controller';
import { TaxesService } from './taxes.service';
import { ids, tax1, tax2, updatedTax1, updatedTaxResult, deletedTaxResult } from '../../test/taxes.mock'


describe('TaxesController', () => {
  let controller: TaxesControllerV1
  let service: TaxesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxesControllerV1],
      providers: [
        TaxesService,
        {
          provide: TaxesService,
          useValue: {
            create: jest.fn().mockImplementation((dto: CreateTaxDto) => {
              if (dto.value == 23) return Promise.resolve<Tax>({ id: +ids[0], ...dto })
              if (dto.value == 7) return Promise.resolve<Tax>({ id: +ids[1], ...dto })
            }),
            findAll: jest.fn().mockImplementation(() => 
              Promise.resolve<Tax[]>([ { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 } ])
            ),
            findOne: jest.fn().mockImplementation((id: number) => {
              switch (id) {
                case 0: return Promise.resolve<Tax>({ id, ...tax1 })
                case 1: return Promise.resolve<Tax>({ id, ...tax2 })
              }
            }),
            update: jest.fn().mockImplementation((id: number, dto: UpdateTaxDto) =>
              Promise.resolve<UpdateResult>({ ...updatedTaxResult, generatedMaps: [dto] })
            ),
            remove: jest.fn().mockImplementation((id: number) => 
              Promise.resolve<DeleteResult>(deletedTaxResult)
            )
          },
        },
      ],
    })
    .compile();
    
    controller = module.get<TaxesControllerV1>(TaxesControllerV1);
    service = module.get<TaxesService>(TaxesService);
  }); 

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it(`should create first tax with id: ${ids[0]}`, async () => {
      expect(controller.create(tax1)).resolves.toEqual<Tax>({ id: +ids[0], ...tax1 })
      expect(service.create).toHaveBeenCalledWith(tax1)
    })

    it(`should create second tax with id: ${ids[1]}`, () => {
      expect(controller.create(tax2)).resolves.toEqual<Tax>({ id: +ids[1], ...tax2 })
      expect(service.create).toHaveBeenCalledWith(tax2)
    })
    
  })

  describe('findAll()',  () => {
    it(`should find all taxes with ids: ${ids}`, async () => {
      expect(controller.findAll()).resolves.toEqual([
        { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 }
      ])
      expect(service.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it(`should find one tax with id: ${ids[0]}`, async () => {
      expect(controller.findOne(ids[0])).resolves.toEqual({ 
        id: +ids[0], ...tax1 
      })
      expect(service.findOne).toHaveBeenCalledWith(+ids[0])
    })

    it(`should not find one tax with wrong id: 3`, async () => {
      expect(controller.findOne('3')).rejects.toEqual({ message: "eee" })
      expect(service.findOne).toHaveBeenCalledWith(3)
    })
  })

  describe('update()', () => {
    it(`should update one tax with id: ${ids[1]}`, async () => {
      expect(controller.update(ids[1], updatedTax1)).resolves.toEqual({ 
        ...updatedTaxResult, generatedMaps: [updatedTax1]
      })
      expect(service.update).toHaveBeenCalledWith(+ids[1], updatedTax1)
    })
  })

  describe('remove()', () => {
    it(`should remove one tax with id: ${ids[0]}`, async () => {
      expect(controller.remove(ids[0])).resolves.toEqual(deletedTaxResult)
      expect(service.remove).toHaveBeenCalledWith(+ids[0])
    })
  })

});
