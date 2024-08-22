import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '@/core/account/application/services/auth.service';
import { SignUpRequest } from '@/infrastructure/adapters/http-server/account/requests/sign-up.request';
import { AppResponse } from '@/infrastructure/adapters/http-server/account/responses/app.response';

@Controller('/auth')
// @UseFilters(ProductCreatorFilter)
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() request: SignUpRequest): Promise<AppResponse> {
    // AppLogger.log(`(POST) Create product`, request);
    const data = await this.authService.signUp(request);

    return {
      status: 201,
      message: `Product(id=${data.id}) created OK`,
      data,
    };
  }
}
