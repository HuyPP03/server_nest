import { SetMetadata } from '@nestjs/common';
import { VerifyEnum } from 'src/enums/verify.enum';

export const VERIFIES_KEY = 'verifies';
export const Verifies = (...verifies: VerifyEnum[]) =>
  SetMetadata(VERIFIES_KEY, verifies);
