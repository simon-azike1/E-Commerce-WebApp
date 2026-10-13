import logo from '../../assets/flow_logo.png';

export default function Logo({ className = 'h-9', alt = 'flow', ...rest }) {
  return (
    <img
      src={logo}
      alt={alt}
      className={`w-auto object-contain ${className}`}
      {...rest}
    />
  );
}
