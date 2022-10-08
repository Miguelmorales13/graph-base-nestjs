import { Test, TestingModule } from "@nestjs/testing";
import { AuthResolver } from "./auth.resolver";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../users/entities/user.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";

describe("AuthController", () => {
  let resolver: AuthResolver;
  const mockUserProvider = {};
  const mockAuthService = {};
  const mockJwtService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: "test",
            signOptions: {
              expiresIn: "1d"
            }
          })
        })
      ],
      controllers: [],
      providers: [AuthService, JwtStrategy, { provide: getModelToken(User), useValue: mockUserProvider }]
    }).overrideProvider(AuthService).useValue(mockAuthService)
      .compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
