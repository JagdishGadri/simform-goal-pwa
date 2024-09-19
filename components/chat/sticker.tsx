'use client';

import Image from 'next/image';

const Sticker = ({
  src,
  alt,
  onClick
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) => (
  <div className="cursor-pointer" onClick={onClick}>
    <Image src={src} width={70} height={70} alt={alt} />
  </div>
);

export default Sticker;
