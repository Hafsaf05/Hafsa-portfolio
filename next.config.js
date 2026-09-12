/** @type {import('next').NextConfig} */
module.exports = { distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next' };
