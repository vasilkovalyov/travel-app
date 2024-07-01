import { AmountType, ChargesDetailsType } from '@/types/common';

export type HotelCardProps = {
  id: number;
  name: string;
  city: string;
  district: string;
  score: number;
  scoreWord: string;
  configurationLabel: string;
  currencycode: string;
  country: string;
  address: string;
  image: string;
  nightsCount: number;
  distanceToCityCenterText: string;
  allInclusiveAmount: AmountType;
  chargesDetails: ChargesDetailsType;
  discountedAmount: AmountType;
  adults: string;
  children: number;
  reviewCount: number;
  classCount: number;
  isFreeCancellable: boolean;
  includeBreakfast: boolean;
  soldout: boolean;
  isNoPrepaymentBlock: boolean;
  isCityCenter: boolean;
};
