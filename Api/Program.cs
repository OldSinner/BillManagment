//Add Configuration 
using System.Text;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
namespace Api;
public static class Program
{
    public static void Main(string[] args)
    {
        NLog.ILogger Logger = LogManager.GetCurrentClassLogger();

        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true)
            .Build();

        //Builder -----------------------------------------
        var builder = WebApplication.CreateBuilder(args);
        builder.Logging.ClearProviders();
        builder.Host.UseNLog();

        //Database -----------------------------------------
        builder.Services.AddDbContext<Context>(x => x.UseMySql(builder.Configuration.GetSection("Database").GetValue<string>("ConnectionString"), new MySqlServerVersion(new Version(8, 0, 21))));
        //End Database

        builder.Services.AddCustomServices();

        builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
           {
               builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
           }));
        builder.Services.AddSingleton(typeof(IConverter),
            new SynchronizedConverter(new PdfTools()));

        builder.Services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(jwt =>
        {
            //Dodanie klucza do odszyfrowywania JWT oraz skonfigurowanie
            //Zachowania falidatora
            var key = Encoding.ASCII.GetBytes(config["JWTConfig:Secret"]);

            jwt.SaveToken = true;
            jwt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                RequireExpirationTime = false
            };
        });

        builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });

        builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
        //End Cors ------------------------------------------
        var app = builder.Build();
        // End Buidler --------------------------------------

        // App Section --------------------------------------
        if (app.Environment.IsDevelopment())
        {
        }
        app.UseCors("corsapp");
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.UseCors();
        app.Run();
        //End App

    }
}