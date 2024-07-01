import { HotelCardProps } from './hotel-card.type';

export const model: HotelCardProps = {
  id: 12,
  name: 'Grand Hotel International - Czech Leading Hotels',
  city: 'Praha',
  district: 'Prague 6',
  country: 'Czech Republic',
  score: 8.7,
  scoreWord: 'Fabulous',
  configurationLabel: '<b>Hotel room</b>: 3 beds',
  currencycode: 'EUR',
  address: 'Koulova 15',
  reviewCount: 1175,
  includeBreakfast: true,
  soldout: false,
  nightsCount: 6,
  classCount: 4,
  image:
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/480491464.jpg?k=2e2aff4f7a55cf1479f69e6c35f86ea4c9387fee4df0210e0b3f0dc2afb1b04a&o=',
  distanceToCityCenterText: '3.1 km',
  allInclusiveAmount: {
    amount_unrounded: '€ 193',
    currency: 'EUR',
    value: 193.41,
    amount_rounded: '€ 193',
  },
  chargesDetails: {
    amount: { currency: 'EUR', value: 0 },
    translated_copy: 'Includes taxes and charges',
    mode: 'all_included',
  },
  discountedAmount: {
    amount_rounded: '€ 16',
    value: 16.82,
    currency: 'EUR',
    amount_unrounded: '€ 17',
  },
  adults: '2',
  children: 2,
  isFreeCancellable: true,
  isNoPrepaymentBlock: true,
  isCityCenter: false,
};
