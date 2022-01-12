import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Tax } from './entities/tax.entity';
import { TaxesService } from './taxes.service';
import { ids, tax1, tax2, updatedTax1, updatedTaxResult, deletedTaxResult } from '../../test/taxes.mock'
import { CreateTaxDto } from './dto/create-tax.dto';

describe('TaxesService', () => {
  let service: TaxesService;
  let repository: Repository<Tax>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxesService,
        {
          provide: getRepositoryToken(Tax),
          useValue: {
            save: jest.fn().mockImplementation((dto: CreateTaxDto) => {
              if (dto.value == 23) return { id: +ids[0], ...dto }
              if (dto.value == 7) return { id: +ids[1], ...dto }
            }),
            find: jest.fn().mockResolvedValue([ { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 }  ] as Tax[]),
            findOne: jest.fn().mockResolvedValue({ id: +ids[0], ...tax1 } as Tax),
            update: jest.fn().mockResolvedValue({ 
              ...updatedTaxResult, generatedMaps: [updatedTax1] } as UpdateResult
            ),
            remove: jest.fn(),
            delete: jest.fn().mockResolvedValue(deletedTaxResult as DeleteResult)
          }
        }
      ], 
    }).compile();

    service = module.get<TaxesService>(TaxesService)
    repository = module.get<Repository<Tax>>(getRepositoryToken(Tax))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it(`should save first tax with id: ${ids[0]}`, async () => {
      const result:Tax = await service.create(tax1)

      expect(result).toEqual<Tax>({ id: +ids[0], ...tax1 })
    })
    
    it(`should save second tax with id: ${ids[1]}`, async () => {
      const result:Tax = await service.create(tax2)

      expect(result).toEqual<Tax>({ id: +ids[1], ...tax2 })
    })
  })

  describe('findAll()', () => {
    it(`should return array of taxes with ids: ${ids}`, async () => {
      const result:Tax[] = await service.findAll()

      expect(result).toEqual<Tax[]>([ 
        { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 } 
      ])
    })
  })


  describe('findOne()', () => {
    it(`should find and return one Tax with id: ${ids[0]}`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result:Tax = await service.findOne(+ids[0])

      expect(result).toEqual<Tax>({ id: +ids[0], ...tax1 })
      expect(spy).toBeCalledWith(+ids[0])
    })
  })

  describe('update()', () => {
    it(`should update one Tax with id: ${ids[1]} and return result`, async () => {
      const spy = jest.spyOn(repository, 'update')
      const result:UpdateResult = await service.update(+ids[1], updatedTax1)

      expect(result).toEqual<UpdateResult>({ ...updatedTaxResult, generatedMaps: [updatedTax1]})
      expect(spy).toBeCalledWith(+ids[1], updatedTax1)
    })
  })

  describe('remove()', () => {
    it(`should remove one Tax with id: ${ids[0]} and return result`, async () => {
      const spy = jest.spyOn(repository, 'delete')
      const result:DeleteResult = await service.remove(+ids[0])

      expect(result).toEqual<DeleteResult>(deletedTaxResult)
      expect(spy).toBeCalledWith(+ids[0])
    })
  })  
});
