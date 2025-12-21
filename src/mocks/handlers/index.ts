import { politicianHandlers } from './politicians';
import { donorHandlers } from './donors';
import { billHandlers } from './bills';

export const handlers = [
  ...politicianHandlers,
  ...donorHandlers,
  ...billHandlers,
];
