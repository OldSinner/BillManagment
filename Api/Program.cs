

//Add Configuration 
using System.Text;
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true)
        .Build();
//Builder -----------------------------------------
var builder = WebApplication.CreateBuilder(args);
//Database -----------------------------------------
builder.Services.AddDbContext<Context>(x => x.UseMySql("server=localhost;Port=3306;uid=root;database=billmanag", new MySqlServerVersion(new Version(8, 0, 21))));

//End Database
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
   {
       builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
   }));
//Cors 
builder.Services.AddScoped<IJWTAuth, JWTAuth>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IBillService, BillService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
   {
       builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
   }));

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
//End Cors ------------------------------------------
var app = builder.Build();
// End Buidler --------------------------------------

// App Section --------------------------------------
if (app.Environment.IsDevelopment())
{
}
app.UseCors("corsapp");
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors();
app.Run();
//End App
