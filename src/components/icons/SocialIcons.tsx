import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const VastLogo: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <img
    src="/png/vast-beta.png"
    alt="Vast Logo"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);

export const XIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 300 300.251" 
    className={className}
    fill="currentColor"
  >
    <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"/>
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    className={className}
    fill="currentColor"
  >
    <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"/>
  </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 838 588" 
    className={className}
    fill="currentColor"
  >
    <path d="M643.3,166.4c-29.2,0-56.2-9.7-77.8-26c-24.8-18.7-42.7-46.2-49-77.8c-1.6-7.8-2.4-15.9-2.5-24.2h-83.5v228.1l-0.1,124.9
		c0,33.4-21.8,61.7-51.9,71.7c-8.8,2.9-18.2,4.3-28,3.7c-12.6-0.7-24.3-4.5-34.6-10.6c-21.8-13-36.5-36.6-36.9-63.7
		c-0.6-42.2,33.5-76.7,75.7-76.7c8.3,0,16.3,1.4,23.8,3.8v-62.3V235c-7.9-1.2-15.9-1.8-24.1-1.8c-46.2,0-89.4,19.2-120.3,53.8
		c-23.3,26.1-37.3,59.5-39.5,94.5c-2.8,45.9,14,89.6,46.6,121.8c4.8,4.7,9.8,9.1,15.1,13.2c27.9,21.5,62.1,33.2,98.1,33.2
		c8.1,0,16.2-0.6,24.1-1.8c33.6-5,64.6-20.4,89.1-44.6c30.1-29.7,46.7-69.2,46.9-111.2l-0.4-186.6c14.3,11.1,30,20.2,46.9,27.3
		c26.2,11.1,54,16.6,82.5,16.6v-60.6v-22.5C643.6,166.4,643.3,166.4,643.3,166.4L643.3,166.4z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z"/>
    <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
