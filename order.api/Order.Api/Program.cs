using Autofac;
using Autofac.Extensions.DependencyInjection;
using Order.Api.Module;
using Order.Application.Modules;
using Order.Application.Services.TokenService;
using Order.Persistence.Context;

var applicationBuilder = WebApplication.CreateBuilder(args);

applicationBuilder.Services.Configure<JwtOptions>(applicationBuilder.Configuration.GetSection("Jwt"));

applicationBuilder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory(containerBuilder =>
    {
        var configuration = applicationBuilder.Configuration;
        containerBuilder.RegisterModule(new ApiModule(configuration));
        containerBuilder.RegisterModule(new ApplicationModule(configuration));
    }
));

applicationBuilder.Services.AddControllers();
applicationBuilder.Services.AddEndpointsApiExplorer();
applicationBuilder.Services.AddSwaggerGen();

applicationBuilder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(b =>
    {
        b.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = applicationBuilder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(_ => true)
    .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await using var scope = app.Services.CreateAsyncScope();
await using var context = scope.ServiceProvider.GetRequiredService<OrderDbContext>();
await context.Database.EnsureCreatedAsync();

app.Run();