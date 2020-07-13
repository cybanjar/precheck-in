import storeModule from '~/store';

const { user } = storeModule('auth').useState(['user']);

export const formatThousands = (number: number) =>
  new Intl.NumberFormat(navigator.language, { minimumFractionDigits: user.value.priceDecimal }).format(number);
