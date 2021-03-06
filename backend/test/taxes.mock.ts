import { CreateTaxDto } from "src/taxes/dto/create-tax.dto";
import { UpdateTaxDto } from "src/taxes/dto/update-tax.dto";

export const ids = ['0', '1']

export const tax1: CreateTaxDto = {
  name: {
    en: "Test tax english name #1",
    pl: "Testowy podatek po polsku #1",
    de: "Deutsche test Steuername #1"
  },
  value: 23,
  isActive: true
};

export const tax2: CreateTaxDto = {
  name: {
    en: "Test tax english name #2",
    pl: "Testowy podatek po polsku #2",
    de: "Deutsche test Steuername #2"
  },
  value: 7,
  isActive: true
};

export const updatedTax1: UpdateTaxDto = {
  name: {
    en: "Update: Test tax english after change name #1",
    pl: "Update: Testowy podatek po polsku #1",
    de: "Update: Deutsche test Steuername #1"
  },
  value: 0,
  isActive: true
}

export const updatedTaxResult = { raw: "rawQuery", affected: 1, generatedMaps: [] }
export const deletedTaxResult = { raw: "rawQuery", affected: 1 }