using Api.Interfaces;
using Api.Services;
using API.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IJWTAuth, JWTAuth>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IBillService, BillService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IStatisticService, StatisticService>();
            return services;
        }
    }
}