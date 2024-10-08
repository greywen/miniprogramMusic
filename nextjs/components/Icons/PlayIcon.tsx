function PlayIcon(props: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) {
  return (
    <svg
      viewBox='0 0 1024 1024'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='42'
      height='42'
      {...props?.svg}
    >
      <path
        d='M768 506.026667v11.946666a32.426667 32.426667 0 0 1-15.786667 27.733334L370.346667 768c-23.04 13.653333-34.986667 13.653333-45.226667 7.68l-10.666667-5.973333a32.426667 32.426667 0 0 1-15.786666-26.88V281.173333a32.426667 32.426667 0 0 1 15.786666-27.733333l10.666667-5.973333c10.24-5.973333 22.186667-5.973333 52.053333 11.52l375.04 219.306666a32.426667 32.426667 0 0 1 15.786667 27.733334z'
        fill='#2c2c2c'
        {...props?.path}
      ></path>
    </svg>
  );
}

export default PlayIcon;
