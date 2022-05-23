

//Add Configuration 
using Api.Data;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: true)
        .Build();
//Builder -----------------------------------------
var builder = WebApplication.CreateBuilder(args);
//Database -----------------------------------------
builder.Services.AddDbContext<Context>(x => x.UseMySql("server=localhost;Port=3306;uid=root;database=billmanag", new MySqlServerVersion(new Version(8, 0, 21))));

//End Database

//Cors 
builder.Services.AddScoped<IJWTAuth, JWTAuth>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
   {
       builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
   }));
//End Cors ------------------------------------------
var app = builder.Build();
// End Buidler --------------------------------------
// App Section --------------------------------------
if (app.Environment.IsDevelopment())
{
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
//End App
