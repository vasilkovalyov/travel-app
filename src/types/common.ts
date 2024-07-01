export type CheckinCheckoutTimeType = {
  from: string;
  until: string;
};

export type DistanceType = {
  icon_set: null;
  text: string;
  icon_name: string;
};

export type ShortAmountType = {
  currency: string;
  value: number;
};

export type AmountType = {
  amount_unrounded: string;
  currency: string;
  amount_rounded: string;
  value: number;
};

export type ChargesDetailsType = {
  amount: ShortAmountType;
  translated_copy: string;
  mode: string;
};

export type PriceBreakdownItemType = {
  details: string;
  kind: string;
  base: { kind: string; percentage?: number };
  identifier?: string;
  inclusion_type?: string;
  item_amount: AmountType;
  name: string;
};

export type PriceBreakdownType = {
  sum_excluded_raw: string;
  has_tax_exceptions: number;
  has_fine_print_charges: number;
  all_inclusive_price: number;
  currency: string;
  has_incalculable_charges: number;
  gross_price: number;
};

export type BadgeType = {
  text: string;
  id: string;
  badge_variant: string;
};
