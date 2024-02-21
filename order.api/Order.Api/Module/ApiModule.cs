using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Order.Application.Services.TokenService;
using Order.Persistence.Context;

namespace Order.Api.Module;

public class ApiModule : Autofac.Module
{
    private readonly IConfiguration _configuration;

    public ApiModule(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void Load(ContainerBuilder builder)
    {
        var services = new ServiceCollection();

        services.AddDbContext<OrderDbContext>();

        services.Configure<JwtOptions>(_configuration.GetSection(nameof(JwtOptions)));

        var jwtOptions = _configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

        services.ConfigureApplicationCookie(options => { options.Cookie.SameSite = SameSiteMode.None; })
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions!.SecretKey))
                };
            });

        services.AddAuthorization();

        builder.Populate(services);
    }
}