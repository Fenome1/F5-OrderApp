using Autofac;
using AutoMapper.Contrib.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;
using Microsoft.Extensions.Configuration;
using Order.Application.Common.Interfaces;
using Order.Application.Common.Mappings;
using Order.Application.Services;
using Order.Application.Services.TokenService;

namespace Order.Application.Modules;

public class ApplicationModule : Module
{
    private readonly IConfiguration _configuration;

    public ApplicationModule(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterType<PasswordHasher>()
            .As<IPasswordHasher>()
            .AsSelf();

        builder.RegisterType<TokenService>()
            .As<ITokenService>()
            .AsSelf();

        builder.RegisterAutoMapper(config => { config.AddProfile(new AssemblyMappingProfile(ThisAssembly)); });

        builder.RegisterMediatR(MediatRConfigurationBuilder
            .Create(ThisAssembly)
            .WithAllOpenGenericHandlerTypesRegistered()
            .WithRegistrationScope(RegistrationScope.Scoped)
            .Build());
    }
}