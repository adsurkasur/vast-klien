
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

interface IconProps {
  size?: number;
  className?: string;
}

export const VastLogo: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <Image
    src="/png/vast-beta.png"
    alt="Vast Logo"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
  />
);

export const XIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <FontAwesomeIcon icon={faXTwitter} className={className} style={{ fontSize: size }} />
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <FontAwesomeIcon icon={faFacebook} className={className} style={{ fontSize: size }} />
);

export const TikTokIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <FontAwesomeIcon icon={faTiktok} className={className} style={{ fontSize: size }} />
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <FontAwesomeIcon icon={faInstagram} className={className} style={{ fontSize: size }} />
);
