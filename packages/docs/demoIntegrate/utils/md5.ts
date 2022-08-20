import crypto from 'crypto';

const getRandomSalt = () => {
  return Math.random().toString().slice(2, 5);
};

export default (code: string) => {
  const md5 = crypto.createHash('md5');
  return md5.update(`${code}-${getRandomSalt()}`).digest('hex');
};
