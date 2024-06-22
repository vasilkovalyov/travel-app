import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '@/assets/icons/selection.json';

function Icon({ size = 16, ...props }: IconProps) {
  return <IcoMoon iconSet={iconSet} width={size} height={size} {...props} />;
}

export default Icon;
