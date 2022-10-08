import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("api/auth")
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(AuthGuard("google"))
  @Get("google/login")
  handleLoginGoogle() {
    return { msg: "Google Authentication" };

  }

  @UseGuards(AuthGuard("google"))
  @Get("google/redirect")
  async handleRedirectGoogle(@Req() req, @Res() res) {
    let { token } = await this.authService.validateGoogle(req.user);
    res.set("authorization", token);
    res.redirect(`http://localhost:3000/admin?token=${token}`);
  }

  @UseGuards(AuthGuard("facebook"))
  @Get("facebook/login")
  handleLogin() {
    return { msg: "Google Authentication" };

  }

  @UseGuards(AuthGuard("facebook"))
  @Get("facebook/redirect")
  async handleRedirect(@Req() req, @Res() res) {
    let { token } = await this.authService.validateFacebook(req.user);
    res.set("authorization", token);
    res.redirect(`http://localhost:3000/admin?token=${token}`);
  }

}
