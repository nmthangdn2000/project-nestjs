import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.guard';

export const Auth = (...role: Role[]) => {
  return applyDecorators(
    SetMetadata('roles', role),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
