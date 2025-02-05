export type SortOption = {
  label: string;
  value: 'asc' | 'desc' | '';
};

export type MinValueOption = {
  label: string;
  value: '' | 'non-zero' | 'min';
};

export type FormField = {
  label: string;
  value: string;
}

export const formFields: Array<FormField> = [
  {
    label: 'Катерогия',
    value: 'sortOrder',
  },
  {
    label: 'Скрытие категорий',
    value: 'minValueFilter'
  }
]

export const sortOptions: Array<SortOption> = [
  { label: 'Без сортировки', value: '' },
  { label: 'По возрастанию', value: 'asc' },
  { label: 'По убыванию', value: 'desc' }
];

export const minValueOptions: Array<MinValueOption> = [
  { label: 'Показывать все', value: '' },
  { label: 'Скрыть нулевые значения', value: 'non-zero' },
  { label: 'Скрыть минимальные значения', value: 'min' }
];

