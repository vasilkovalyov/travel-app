import './filter-skeleton.scss';

export default function SidebarFilterSkeleton() {
  const items = Array.from(Array(4).keys());
  return (
    <div className="filter-skeleton">
      <div className="filter-skeleton__heading pulse-animation"></div>
      <div className="filter-skeleton__list">
        {items.map((item) => (
          <div key={item} className="checkbox-skeleton">
            <div className="checkbox-skeleton__mark pulse-animation"></div>
            <div className="checkbox-skeleton__label pulse-animation"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
