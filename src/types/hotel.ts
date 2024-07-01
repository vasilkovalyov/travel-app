import {
  AmountType,
  CheckinCheckoutTimeType,
  DistanceType,
  ChargesDetailsType,
  PriceBreakdownItemType,
  PriceBreakdownType,
  BadgeType,
} from './common';

export type ExtendsCompositePriceBreakdownType = CompositePriceBreakdownType & {
  product_price_breakdowns: CompositePriceBreakdownType[];
};

export type CompositePriceBreakdownType = {
  benefits: any[];
  client_translations: { tooltip_total_text: string };
  gross_amount_per_night: AmountType;
  all_inclusive_amount: AmountType;
  discounted_amount: AmountType;
  net_amount: AmountType;
  excluded_amount: AmountType;
  strikethrough_amount: AmountType;
  gross_amount: AmountType;
  charges_details: ChargesDetailsType;
  included_taxes_and_charges_amount: AmountType;
  gross_amount_hotel_currency: AmountType;
  strikethrough_amount_per_night: AmountType;
  items: PriceBreakdownItemType[];
};

export type HotelType = {
  id: string;
  bwallet: { hotel_eligibility: number };
  is_beach_front: number;
  preferred: number;
  accommodation_type_name: string;
  city_name_en: string;
  is_geo_rate: string;
  country_trans: string;
  extended: number;
  wishlist_count: number;
  countrycode: string;
  soldout: number;
  unit_configuration_label: string;
  hotel_id: number;
  genius_discount_percentage: number;
  checkin: CheckinCheckoutTimeType;
  ufi: number;
  distance: string;
  districts: string;
  native_ad_id: string;
  review_score: number;
  in_best_district: number;
  cc1: string;
  price_breakdown: PriceBreakdownType;
  is_free_cancellable: number;
  property_cribs_availability: number;
  is_city_center: number;
  hotel_facilities: string;
  selected_review_topic: null;
  class: number;
  address: string;
  children_not_allowed: number;
  checkout: CheckinCheckoutTimeType;
  city: string;
  currency_code: string;
  timezone: string;
  updated_checkout: null;
  min_total_price: number;
  composite_price_breakdown: ExtendsCompositePriceBreakdownType;
  district_id: number;
  badges: BadgeType[];
  address_trans: string;
  longitude: number;
  native_ads_tracking: string;
  native_ads_cpc: number;
  is_smart_deal: number;
  city_in_trans: string;
  type: string;
  accommodation_type: number;
  zip: string;
  default_language: string;
  block_ids: string[];
  matching_units_configuration: {
    matching_units_common_config: {
      localized_area: null;
      unit_type_id: number;
    };
  };
  is_no_prepayment_block: number;
  cc_required: number;
  hotel_name_trans: string;
  hotel_include_breakfast: number;
  default_wishlist_name: string;
  is_mobile_deal: number;
  review_score_word: string;
  currencycode: string;
  city_trans: string;
  class_is_estimated: number;
  distance_to_cc_formatted: string;
  hotel_has_vb_boost: number;
  hotel_name: string;
  preferred_plus: number;
  url: string;
  mobile_discount_percentage: number;
  main_photo_id: number;
  distance_to_cc: string;
  price_is_final: number;
  distances: DistanceType[];
  district: string;
  latitude: number;
  review_nr: number;
  main_photo_url: string;
  is_genius_deal: number;
  review_recommendation: string;
  cant_book: number;
  updated_checkin: null;
  max_photo_url: string;
  max_1440_photo_url: string;
};
