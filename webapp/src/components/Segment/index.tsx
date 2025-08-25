import css from './index.module.scss';

type SegmentProps = {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
  children?: React.ReactNode;
  marginTop?: string | number;
  width?: string | number;
};

export const Segment = ({ title, size = 1, description, children, marginTop, width }: SegmentProps) => {
  const segmentStyle = {
    ...(marginTop ? {
      marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop
    } : {}),
    ...(width ? {
      width: typeof width === 'number' ? `${width}px` : width
    } : {})
  }; 
  return (
    <div className={css.segment} style={segmentStyle}>
      {size === 1 ? <h1 className={css.title}>{title}</h1> : <h2 className={css.title}>{title}</h2>}
      {description && <p className={css.description}>{description}</p>}
      {children && <div className={css.content}>{children}</div>}
    </div>
  );
};
