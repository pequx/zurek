import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Tax } from './entities/tax.entity';
import { TaxesService } from './taxes.service';
import { ids, tax1, tax2, updatedTax1, updatedTaxResult, deletedTaxResult } from '../../test/taxes.mock'
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Message } from 'src/message.interface';
import { messages } from '../../src/messages';
import { MessageService } from '@app/message';
import { HelperService } from '@app/helper';

describe('TaxesService', () => {
  let service: TaxesService;
  let repository: Repository<Tax>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxesService,
        MessageService,
        HelperService,
        {
          provide: getRepositoryToken(Tax),
          useValue: {
            save: jest.fn().mockImplementation((dto: CreateTaxDto) => {
              if (dto.value == 23) return { id: +ids[0], ...dto } as Tax
              if (dto.value == 7) return { id: +ids[1], ...dto } as Tax
            }),
            find: jest.fn().mockResolvedValue([ { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 }  ] as Tax[]),
            findOne: jest.fn().mockImplementation(( id: number ) => {
              switch (id) {
                case +ids[0]: return { id, ...tax1 } as Tax
                case +ids[1]: return { id, ...tax2 } as Tax
              }
            }),
            update: jest.fn().mockImplementation((id: number, dto: UpdateTaxDto) => {
              if (id == +ids[1]) return { ...updatedTaxResult, generatedMaps: [{ id, ...dto }] } as UpdateResult
              return { ...updatedTaxResult, affected: 0, generatedMaps: [] } as UpdateResult
            }),
            delete: jest.fn().mockImplementation((id: number) => {
              if (id == +ids[0]) return { ...deletedTaxResult } as DeleteResult
            })
          }
        },
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
      const result = await service.create(tax1)

      expect(result).toEqual<Tax>({ id: +ids[0], ...tax1 })
    })
    
    it(`should save second tax with id: ${ids[1]}`, async () => {
      const result = await service.create(tax2)

      expect(result).toEqual<Tax>({ id: +ids[1], ...tax2 })
    })
  })

  describe('findAll()', () => {
    it(`should return array of taxes with ids: ${ids}`, async () => {
      const result = await service.findAll()

      expect(result).toEqual<Tax[]>([ 
        { id: +ids[0], ...tax1 }, { id: +ids[1], ...tax2 } 
      ])
    })
  })

  describe('findOne()', () => {
    it(`should find and return one Tax with id: ${ids[0]}`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result = await service.findOne(+ids[0])

      expect(result).toEqual<Tax>({ id: +ids[0], ...tax1 })
      expect(spy).toBeCalledWith(+ids[0])
    })

    it(`should return a message on non-id`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result = await service.findOne(3)

      expect(result).toEqual<Message>(messages.ENTITY_NOT_FOUND)
      expect(spy).toBeCalledWith(3)
    })
  })

  describe('update()', () => {
    it(`should update one Tax with id: ${ids[1]} and return result`, async () => {
      const spyFindOne = jest.spyOn(repository, 'findOne')
      const spyUpdate = jest.spyOn(repository, 'update')
      const result = await service.update(+ids[1], updatedTax1)

      expect(result).toEqual({ id: +ids[1], ...updatedTax1 })
      expect(spyFindOne).toBeCalledWith(+ids[1])
      expect(spyUpdate).toBeCalledWith(+ids[1], updatedTax1)
    })

    it(`should return message on non-id`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result = await service.update(3, updatedTax1)

      expect(result).toEqual<Message>(messages.ENTITY_NOT_FOUND)
      expect(spy).toBeCalledWith(3)
    })
  })

  describe('remove()', () => {
    it(`should remove one Tax with id: ${ids[0]} and return result`, async () => {
      const spyFindOne = jest.spyOn(repository, 'findOne')
      const spyDelete = jest.spyOn(repository, 'delete')
      const result = await service.remove(+ids[0])

      expect(result).toEqual<Tax>({ id: +ids[0], ...tax1 })
      expect(spyFindOne).toBeCalledWith(+ids[0])
      expect(spyDelete).toBeCalledWith(+ids[0])
    })

    it(`should return message on non-id`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result = await service.remove(3)

      expect(result).toEqual<Message>(messages.ENTITY_NOT_FOUND)
      expect(spy).toBeCalledWith(3)
    })

    it(`should return message on error`, async () => {
      const spy = jest.spyOn(repository, 'findOne')
      const result = await service.remove(3)

      expect(result).toEqual<Message>(messages.ENTITY_NOT_FOUND)
      expect(spy).toBeCalledWith(3)
    })
  })  
});
