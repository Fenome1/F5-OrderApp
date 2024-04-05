using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Order.Application.Modules;
using Order.Application.Services.TokenService;

namespace Order.Tests.Common;

internal static class TestContainer
{
    private static readonly IContainer Container;

    static TestContainer()
    {
        var applicationBuilder = WebApplication.CreateBuilder();
        applicationBuilder.Services.Configure<JwtOptions>(applicationBuilder.Configuration.GetSection("Jwt"));
        
        var builder = new ContainerBuilder();
        
        applicationBuilder.Services.Configure<JwtOptions>(applicationBuilder.Configuration.GetSection("Jwt"));
        builder.RegisterModule<ApplicationModule>();

        Container = builder.Build();
    }

    public static T Resolve<T>() where T : notnull
    {
        return Container.Resolve<T>();
    }
}