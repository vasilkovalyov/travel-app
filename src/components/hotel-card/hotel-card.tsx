import { Link } from 'react-router-dom';
import { HotelCardProps } from './hotel-card.type';

import './hotel-card.scss';
import { Button, Icon, IconEnum } from '../ui';
import { Rating } from '../rating';

export default function HotelCard({
  id,
  name,
  city,
  district,
  score,
  scoreWord,
  configurationLabel,
  country,
  address,
  image,
  distanceToCityCenterText,
  adults,
  children,
  nightsCount,
  reviewCount,
  classCount,
  allInclusiveAmount,
  chargesDetails,
  isFreeCancellable,
  includeBreakfast,
  isNoPrepaymentBlock,
}: HotelCardProps) {
  return (
    <div className="hotel-card">
      <div className="hotel-card__image-box">
        {includeBreakfast && (
          <p className="hotel-card__breakfast-label">Breakfast included</p>
        )}
        <img src={image} alt={name} className="hotel-card__image" />
      </div>
      <div className="hotel-card__body">
        <div className="hotel-card__top-content">
          <div className="hotel-card__left-content">
            <h4 className="hotel-card__title">
              <Link to={id.toString()}>{name}</Link>
            </h4>
            <p className="hotel-card__location">
              <Icon icon={IconEnum.LOCATION} />
              <span>
                {address}, {district}, {city}, {country}
              </span>
            </p>

            <Rating rating={classCount} />
            <p className="hotel-card__distance-to-city-center">
              {distanceToCityCenterText} from city center
            </p>
          </div>
          <div className="hotel-card__right-content">
            <div className="hotel-card__score-container">
              <div className="hotel-card__score-content">
                <div className="hotel-card__score-text">{scoreWord}</div>
                <div className="hotel-card__reviews">
                  {reviewCount} {reviewCount >= 2 ? 'reviews' : 'review'}
                </div>
              </div>
              <div className="hotel-card__score">{score}</div>
            </div>
          </div>
        </div>
        <div className="hotel-card__bottom-content">
          <div className="hotel-card__left-content">
            <div
              className="hotel-card__configuration-content"
              dangerouslySetInnerHTML={{ __html: configurationLabel }}
            ></div>
            {isFreeCancellable && isNoPrepaymentBlock && (
              <ul className="hotel-card__details">
                {isFreeCancellable && (
                  <li>
                    <p>
                      <strong>Free cancellation</strong>
                    </p>
                  </li>
                )}
                {isNoPrepaymentBlock && (
                  <li>
                    <p>
                      <strong>No prepayment required</strong> - pay on the spot
                    </p>
                  </li>
                )}
              </ul>
            )}
          </div>
          <div className="hotel-card__right-content">
            <div className="hotel-card__visitors">
              {nightsCount} {nightsCount >= 2 ? 'nights' : 'night'}, {adults}{' '}
              {Number(adults) >= 2 ? 'adults' : 'adult'},{' '}
              {children && <span>{children} children</span>}
            </div>
            <div className="hotel-card__price-container">
              <span className="hotel-card__new-price">
                {allInclusiveAmount.amount_rounded}
              </span>
            </div>
            <div className="hotel-card__charge-detail">
              {chargesDetails.translated_copy}
            </div>
            <Button href={id.toString()} variant="secondary">
              View more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
