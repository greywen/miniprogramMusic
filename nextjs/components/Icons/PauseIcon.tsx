function PauseIcon(props: {
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
        d='M426.666667 288v448a32.426667 32.426667 0 0 1-32 32h-64a32.426667 32.426667 0 0 1-32-32V288A32.426667 32.426667 0 0 1 330.666667 256h64a32.426667 32.426667 0 0 1 32 32zM693.333333 256h-64a32.426667 32.426667 0 0 0-32 32v448a32.426667 32.426667 0 0 0 32 32h64a32.426667 32.426667 0 0 0 32-32V288a32.426667 32.426667 0 0 0-32-32z'
        fill='#2c2c2c'
        {...props?.path}
      ></path>
    </svg>
  );
}

export default PauseIcon;
