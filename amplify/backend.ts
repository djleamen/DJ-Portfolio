import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/authResource';
import { data } from './data/dataResource';

defineBackend({
  auth,
  data,
});
