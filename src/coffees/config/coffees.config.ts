import { registerAs } from '@nestjs/config';

// registerAs allows us to register a namespace config object under the key passed as the first argument, in this case 'coffees'
export default registerAs('coffees', () => ({
  key: 'value',
}));
